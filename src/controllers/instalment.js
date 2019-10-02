const Instalment = require("../models").Instalment;
// Controllers are used for handle any incoming URL request
module.exports = {
  // Create a new instalment
  create(value,dueDate,overdraftDebtId) {
    console.log("testee 1")

    return Instalment.create({
      isPaid: false,
      value: value,
      dueDate: dueDate,
      overdraftDebtId: overdraftDebtId      
    })
      .then(instalment => {
        console.log("testee")
        return  instalment
      }).catch(error=>{console.log(error)})
  }

}