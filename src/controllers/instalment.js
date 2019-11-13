const Instalment = require('../models').Instalment;

// Controllers are used for handle any incoming URL request
module.exports = {

    listByDebt(req, res) {
        return Instalment.findAll({
            where: {
                overdraftDebtId: req.params.overdraftDebtId
            }
        })
            .then(instalments=>{
                if(instalments==''){
                    return res.status(404).send({'message':'instalments not found'});
                }
                return res.status(200).send(instalments);
            });
    },

    


    payInstalment(req, res){
        return Instalment.findByPk(req.params.id)
        .then(async instalment=>{
            if(!instalment){
                return res.status(404).send({
                    message:'Instalment Not Found'
                });
            }
            let overdraftDebt = await OverdraftDebt.findByPk(instalment.overdraftDebtId)
            if(!overdraftDebt){
                return res.status(404).send({
                    message:'overdraftDebt Not Found'
                });
            }
            let account = await Account.findOne({
                where: {
                    userId: overdraftDebt.userId
                }
            })
            if(!account){
                return res.status(404).send({
                    message:'account Not Found'
                });
            }
            if(account.balance < instalment.value){
                return res.status(400).send({
                    message:'insuficient account balance'
                });
            }
            await account.update({
                balance: balance - instalment.value
            });
            return instalment.update({
                isPaid:true
            })
        })
        .catch(error=>{
            return res.status(400).send(error);
        });
    }
};