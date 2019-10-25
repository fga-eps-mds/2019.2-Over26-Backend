const OverdraftDebt = require("../models").OverdraftDebt;
const Instalment = require("../models").Instalment;

module.exports = {
    creatInstalment(value, dueDate, overdraftDebtId) {
        return OverdraftDebt.findByPk(overdraftDebtId)
        .then(overdraftDebt=>{
            console.log(overdraftDebt.id)
                return Instalment.create({
                    overdraftDebtId:overdraftDebt.id,
                    isPaid: false,
                    value: value,
                    dueDate: dueDate,
                })
                    .then(instalment => {
                        console.log(instalment)
                        return instalment
                   
            })

        }).catch(error => error)
    }

};
