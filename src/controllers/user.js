const User = require("../models").User;
// Controllers are used for handle any incoming URL request
module.exports = {
  // Create a new user
  create(req, res) {
    return User.create({
      cpf: req.body.cpf,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      monthly_income: req.body.monthly_income      
    })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  // Get a user by primary key
  getByPk(req, res) {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User Not Found"
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send("error"));
  },
  // Get a user by primary key and update it
  update(req, res) {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: "User Not Found"
          });
        }
        return user
          .update({
            cpf: req.body.cpf,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            monthly_income: req.body.monthly_income 
          })
          .then(() => res.status(200).send(user))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};