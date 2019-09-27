const instalment = require("../models").instalment;
// Controllers are used for handle any incoming URL request
module.exports = {
  // Create a new instalment
  create(req, res) {
    return Instalment.create({
      isPaid: req.body.isPaid,
      value: req.body.value,
      dueDate: req.body.dueDate,
      overdraftDebtId: req.body.overdraftDebtId      
    })
      .then(instalment => res.status(201).send(instalment))
      .catch(error => res.status(400).send(error));
  }

}