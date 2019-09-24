const OverdraftDebt = require("../models").OverdraftDebt;
const User = require("../models").User;

module.exports = {
     create(req, res) {

       return User.findByPk(req.params.id)
        .then(user=>{
            console.log(user.cpf)

            entryDate =new Date()
            amount = 0
            rate = 0.1
            wasDivided= false

            return user.createOverdraftDebt({
                entryDate: entryDate,
                amount: amount,
                rate: rate,
                wasDivided: wasDivided,
            })
                .then(overdraftDebt => res.status(201).send(overdraftDebt))
                .catch(error => res.status(400).send(error));
        })
        
    },


}