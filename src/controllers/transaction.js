const Transaction = require('../models').Transaction;
const Account = require('../models').Account;
const Overdraft = require('../models').Overdraft;

module.exports = {
    list(req, res) {
        return Transaction.findAll()
            .then(transactions => res.status(200).send(transactions))
            .catch(error => {
                res.status(400).send(error);
            });
    },

    // Create a new transaction
    makeTransaction(req, res) {
        const { type, description, value, name } = req.body;
        return Account.findByPk(req.body.accountId)
            .then(account => {
                if (!account) {
                    return res.status(404).send({
                        message: 'Account Not Found'
                    });
                }

                return Overdraft.findOne({
                    where: {
                        userId: account.userId
                    }
                }).then(overdraft => {


                    if (type != 'in') {                           //Checa para saber se é um cash-out
                        if (account.balance - value < 0) {
                            //Checa se o valor final após cash-out será negativo
                            if (overdraft != null && overdraft.isActive && !overdraft.isBlocked) {     //Checa se o usuário tem um Overdraft e se ele está ativo
                                const overdraftBalance = overdraft.limit - overdraft.limitUsed;   // Constante para saldo do Overdraft
                                if (parseFloat(account.balance <= 0 ? 0 : account.balance) + parseFloat(overdraftBalance) - value >= 0) {   //Checa se o saldo da conta somado ao saldo do Overdraft é suficente para o pagamento
                                    return account
                                        .createTransaction({
                                            date: new Date(),
                                            type: type,
                                            description: description,
                                            value: value,
                                            name: name,
                                        })
                                        .then(transaction => {
                                            return account
                                                .update({
                                                    balance:
                                                        account.balance - value
                                                })
                                                .then(() => {
                                                    var newLimitUsed = 0.0;
                                                    if(account.balance < 0){
                                                        newLimitUsed = Math.abs(account.balance);
                                                    }
                                                    return overdraft.update({
                                                        limitUsed: newLimitUsed,
                                                        firstUseDate: overdraft.firstUseDate ? overdraft.firstUseDate : new Date()
                                                    })
                                                        .then(() => res.status(201).send(transaction));
                                                });
                                        });
                                }
                                else {                                        //Caso em que o saldo é insuficiente mesmo tendo Overdraft
                                    return res.status(400).send({
                                        message: 'Insufficient overdraft limit'
                                    });
                                }
                            }
                            else {                                          //Caso em que o saldo não é suficiente e o usuário não tem Overdraft ativo.
                                return res.status(400).send({
                                    message: 'Overdraft is not activated or is blocked'
                                });
                            }
                        }
                        else {                                            //Caso em que o saldo é suficiente para o pagamento, não necessitando do Overdraft.
                            return account
                                .createTransaction({
                                    date: new Date(),
                                    name: name,
                                    type: type,
                                    description: description,
                                    value: value,
                                })
                                .then(transaction => {
                                    return account
                                        .update({
                                            balance:
                                                parseFloat(account.balance) - parseFloat(transaction.value),
                                        })
                                        .then(() => res.status(201).send(transaction));
                                });
                        }
                    }
                    return account                 //Caso para o cash-in
                        .createTransaction({
                            date: new Date(),
                            type: type,
                            name: name,
                            description: description,
                            value: value,
                        })
                        .then(async transaction => {

                            if (overdraft != null && !overdraft.isBlocked && overdraft.limitUsed > 0) {        //Checa se o usuário tem overdraft e se o limite usado é superior a zero
                                await account.update({
                                    balance: parseFloat(account.balance) + parseFloat(transaction.value)
                                });
                                await overdraft.update({
                                    limitUsed: overdraft.limitUsed - value < 0 ? 0 : overdraft.limitUsed - value,      //Subtrai o valor inserido do limite usado, iguala a zero se o resultado for negativo.
                                    firstUseDate: overdraft.limitUsed - value <= 0 ? null : overdraft.firstUseDate     //Caso valor abata dívida, a data de início do uso do Overdraft é nulificada.
                                });
                            } else {
                                await account
                                    .update({
                                        balance:
                                            parseFloat(account.balance) +
                                            parseFloat(transaction.value)
                                    });
                            }

                            return res.status(201).send(transaction);
                        });
                });
            })
            .catch(error => res.status(400).send(error));
    },

    // Get a transaction by primary key
    getByPk(req, res) {
        return Transaction.findByPk(req.params.id)
            .then(transaction => {
                if (!transaction) {
                    return res.status(404).send({
                        message: 'Transaction Not Found'
                    });
                }
                return res.status(200).send(transaction);
            })
            .catch(() => res.status(400).send('error'));
    }
};
