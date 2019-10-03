const Instalment = require("../models").Instalment;
// Controllers are used for handle any incoming URL request
module.exports = {
  // Create a new instalment
  create(value,dueDate,overdraftDebtId) {

    return Instalment.create({
      isPaid: false,
      value: value,
      dueDate: dueDate,
      overdraftDebtId: overdraftDebtId      
    })
      .then(instalment => {
        return  instalment
      }).catch(error=>error)
  }

}