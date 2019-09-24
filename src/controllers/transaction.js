const Transaction = require("../models").Transaction;
const Account = require("../models").Account;

module.exports = {

list(req, res) {
    return Transaction.findAll()
      .then(transactions => res.status(200).send(transactions))
      .catch(error => {
        res.status(400).send(error);
      });
  },

  // Create a new transaction
  cashIn(req, res) {
    console.log(req.body)
    return Transaction.create({
      date: req.body.date,
      type: req.body.type,
      description: req.body.description,
      value: req.body.value,
      accountNumber: req.body.accountNumber,
      agencyNumber: req.body.agencyNumber

    })
      .then(transaction => {
           Account.findByPk(req.params.id)
            .then(account => {
              if (!account) {
                return res.status(404).send({
                  message: "Account Not Found"
                });
              }
              account
                .update({
                  balance: (parseFloat(account.balance) + parseFloat(transaction.value))
                })
                .catch(error => res.status(400).send(error))
            })
            .catch(error => res.status(400).send(error));
      return res.status(201).send(transaction)})
      .catch(error => res.status(400).send(error));
  },

  // Get a transaction by primary key
  getByPk(req, res) {
    return Transaction.findByPk(req.params.id)
      .then(transaction => {
        if (!transaction) {
          return res.status(404).send({
            message: "Transaction Not Found"
          });
        }
        return res.status(200).send(transaction);
      })
      .catch(error => res.status(400).send("error"));
  },

};