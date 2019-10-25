const OverdraftDebt = require("../models").OverdraftDebt;
const Instalment = require("../models").Instalment;

module.exports = {
    creatInstalment(value, dueDate, overdraftDebtId) {
        
                return Instalment.create({
                    overdraftDebtId:overdraftDebtId,
                    isPaid: false,
                    value: value,
                    dueDate: dueDate,
                })
                    .then(instalment => {
                        return instalment
                   
            }).catch(error => error)
    }

};
