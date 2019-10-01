const instalment = require("../models").instalment;
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
      .then(instalment => res.status(201)).send(instalment)
      .catch(error => res.status(400).send(error));
  }

}