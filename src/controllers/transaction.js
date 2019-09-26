const Transaction = require("../models").Transaction;
const Account = require("../models").Account;
const Overdraft = require("../models").Overdraft;

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
    const { type, description, value } = req.body
    return Account.findByPk(req.params.accountNumber)
      .then(account => {
        if (!account) {
          return res.status(404).send({
            message: "Account Not Found"
          });
        }

        return Overdraft.findOne({
          where: {
            userCPF: account.userCPF
          }
        }).then(overdraft => {

          console.log(type)

          if (type != "in") {  
            if (account.balance - value < 0) {
              if (overdraft != null && overdraft.status != false) {
                const overdraftBalance = overdraft.limit - overdraft.limitUsed
                if (parseFloat(account.balance<=0? 0: account.balance) + parseFloat(overdraftBalance) - value >= 0) {
                  return account
                    .createTransaction({
                      date: new Date(),
                      type: type,
                      description: description,
                      value: value
                    })
                    .then(transaction => {
                      console.log('Deus é top')
                      return account
                        .update({
                          balance:
                            account.balance - value
                        })
                        .then(() => {
                          return overdraft.update({
                            limitUsed: Math.abs(account.balance) + parseFloat(overdraft.limitUsed),
                            firstUseDate: overdraft.firstUseDate? overdraft.firstUseDate: new Date()
                          })
                          .then(account => console.log(account))
                            .then(() => res.status(201).send(transaction))
                        })
                    });
                }
                else {
                  return res.status(400).send({
                    message: "Insufficient overdraft limit"
                  });
                }
              }
              else {
                return res.status(400).send({
                  message: "Doesn't have active overdraft"
                })
              }
            }
            else {
              return account
                .createTransaction({
                  date: new Date(),
                  type: type,
                  description: description,
                  value: value
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

          return account
            .createTransaction({
              date: new Date(),
              type: type,
              description: description,
              value: value
            })
            .then(transaction => {
              console.log(transaction);
              return account
                .update({
                  balance:
                      parseFloat(account.balance) +
                      parseFloat(transaction.value)
                })
                .then(() => {
                  if(overdraft != null && overdraft.status != false && overdraft.limitUsed > 0){
                    return overdraft.update({
                      limitUsed: overdraft.limitUsed - value < 0? 0 : overdraft.limitUsed - value,
                      firstUseDate: overdraft.limitUsed - value <= 0? null : overdraft.firstUseDate
                    })
                  }
                })
                .then(() => res.status(201).send(transaction));
            });
        })
      })
      .catch(error => res.status(400).send(error));
  },

  // Get a transaction by primary key
  getByPk(req, res) {
    return Transaction.findByPk(req.params.id)
      .then(transaction => {
        if (!transaction) {
          return res.status(404).send({
            message: "Transaction Not Found"
          });
        }
        return res.status(200).send(transaction);
      })
      .catch(error => res.status(400).send("error"));
  }
};
