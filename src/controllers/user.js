const User = require("../models").User;
// Controllers are used for handle any incoming URL request
module.exports = {
  // List all users
  list(req, res) {
    return User.findAll()
      .then(users => res.status(200).send(users))
      .catch(error => {
        res.status(400).send(error);
      });
  },
  // Create a new user
  create(req, res) {
    return User.create({
      username: req.body.username,
      email: req.body.email
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
            username: req.body.username,
            email: req.body.email
          })
          .then(() => res.status(200).send(user))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  // Get a user by primary key and delete it
  delete(req, res) {
    return User.findByPk(req.params.id)
      .then(user => {
        if (!user) {
          return res.status(400).send({
            message: "User Not Found"
          });
        }
        return user
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};
