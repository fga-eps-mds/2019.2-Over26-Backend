const Overdraft = require("../models").overdraft;
// Controllers are used for handle any incoming URL request
module.exports = {

  // Get overdraft by primary key
  getByPk(req, res) {
    return Account.findByPk(req.params.id)
      .then(overdraft => {
        if (!overdraft) {
          return res.status(404).send({
            message: "Overdraft Not Found"
          });
        }
        return res.status(200).send(overdraft);
      })
      .catch(error => res.status(400).send("error"));
  },
  // Get overdraft by primary key and update it
  update(req, res) {
    return Overdraft.findByPk(req.params.id)
      .then(overdraft => {
        if (!overdraft) {
          return res.status(404).send({
            message: "Overdraft Not Found"
          });
        }
        return overdraft
          .update({
            limit: req.body.limit,
            limit_max: req.body.limit_max,
            limit_used: req.body.limit_used
          })
          .then(() => res.status(200).send(overdraft))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },
  // Get overdraft by primary key and update it
  desabilit(req, res) {
    return Overdraft.findByPk(req.params.id)
      .then(overdraft => {
        if (!overdraft) {
          return res.status(404).send({
            message: "Overdraft Not Found"
          });
        }
        return overdraft
          .update({
            status: false
          })
          .then(() => res.status(200).send(overdraft))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};