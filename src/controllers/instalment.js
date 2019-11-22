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
            .then(instalment=>{
                if(!instalment){
                    return res.status(404).send({
                        message:'Instalment Not Found'
                    });
                }
                return instalment.update({
                    isPaid:true
                })
                    .then(instalment=>{
                        return res.status(200).send(instalment);
                    });
            })
            .catch(error=>{
                return res.status(400).send(error);
            });
    }
};