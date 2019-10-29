const Instalment = require("../models").Instalment;
const OverdraftDebt = require("../models").OverdraftDebt;

// Controllers are used for handle any incoming URL request
module.exports = {

    listByDebt(req, res) {
        return Instalment.findAll({
            where: {
                overdraftDebtId: req.params.overdraftDebtId
            }
        })
        .then(instalments=>{
            if(instalments==""){
                return res.status(404).send({"message":"instalments not found"});
            }
            return res.status(200).send(instalments)
        })
    }

    


}