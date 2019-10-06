const OverdraftDebt = require("../models").OverdraftDebt;
const Instalment = require("../models").Instalment;

module.exports = {
    creatInstalment(value, dueDate, overdraftDebtId) {
        return Instalment.create({
            isPaid: false,
            value: value,
            dueDate: dueDate,
            overdraftDebtId: overdraftDebtId
        })
            .then(instalment => {
                return instalment
            }).catch(error => error)
    }

};
