const Account = require("../models").Account;
const User = require('../models').User;

// Controllers are used for handle any incoming URL request
module.exports = {

  // Create a new account
  create(req, res) {
    return Account.create({
      cpf: req.body.cpf,
      agency: req.body.agency,
      number: req.body.number,
      balance: req.body.balance,
      userId: req.body.userId
    })
      .then(account => res.status(201).send(account))
      .catch(error => res.status(400).send(error));
  },
  // Get a account by primary key
  getByPk(req, res) {
    return Account.findByPk(req.params.id)
      .then(account => {
        if (!account) {
          return res.status(404).send({
            message: "Account Not Found"
          });
        }
        return res.status(200).send(account);
      })
      .catch(error => res.status(400).send("error"));
  },
  // Get a account by primary key and update it
  update(req, res) {
    return Account.findByPk(req.params.id)
      .then(account => {
        if (!account) {
          return res.status(404).send({
            message: "Account Not Found"
          });
        }
        return account
          .update({
            cpf: req.body.cpf,
            agency: req.body.agency,
            number: req.body.number,
            balance: req.body.balance
          })
          .then(() => res.status(200).send(account))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
