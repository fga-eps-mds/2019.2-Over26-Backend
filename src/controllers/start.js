const Account = require("../models").Account;
const User = require("../models").User;

module.exports = {

    async startApp(req, res) {
        const user = await User.create({name: req.body.name,
            cpf: "12345678914",
            email: "ana3@SpeechGrammarList.com",
            phone: "61912345678",
            monthlyIncome: 3000})
            .then(user => user)
            .catch(error => false)
            if(!user){
                return res.status(400).send({
                    message: "Error creating user"
                });
            }
        const account = await Account.create({userId: user.id,
            agency: 123456,
            number: 123456,
            balance: 100.00})
            .then(account => account)
            .catch(error => false)
            if(!account){
                return res.status(400).send({
                    message: "Error creating account"
                });
            }
        return res.status(200).send({user, account})
    
}

};