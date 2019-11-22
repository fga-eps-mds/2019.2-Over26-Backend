const OverdraftDebt = require('../models').OverdraftDebt;
const Instalment = require('../models').Instalment;

module.exports = {
    creatInstalment(value, dueDate, overdraftDebtId) {
        return OverdraftDebt.findByPk(overdraftDebtId)
            .then(overdraftDebt=>{
                return Instalment.create({
                    overdraftDebtId:overdraftDebt.id,
                    isPaid: false,
                    value: value,
                    dueDate: dueDate,
                })
                    .then(instalment => {
                        return instalment;
                   
                    });

            }).catch(error => error);
    }

};
