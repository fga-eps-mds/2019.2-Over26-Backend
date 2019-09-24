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
    return Transaction.create({
      date: req.body.date,
      type: req.body.type,
      description: req.body.description,
      value: req.body.value,  

    })
      .then(transaction => {
        update(req, res); {
          return Account.findByPk(req.params.id)
            .then(account => {
              if (!account) {
                return res.status(404).send({
                  message: "Account Not Found"
                });
              }
              return account
                .update({
                  balance: (account.balance + value)
                })
                .then(() => res.status(200).send(account))
                .catch(error => res.status(400).send(error))
            })
            .catch(error => res.status(400).send(error));
        }
      }
       res.status(201).send(transaction))
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