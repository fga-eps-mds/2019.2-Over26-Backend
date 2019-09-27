const Overdraft = require("../models").Overdraft;

module.exports = {
    list(req, res) {
        return Overdraft.findAll()
            .then(overdrafts => res.status(200).send(overdrafts))
            .catch(error => {
                res.status(400).send(error);
            });
    },
    create(req, res) {

        status = false
        limit = 200
        limitMax = 200
        limitUsed = 0
        solicitationDate = new Date()


        return Overdraft.create({
            status: status,
            limit: limit,
            limitMax: limitMax,
            limitUsed: limitUsed,
            solicitationDate: solicitationDate
        })
            .then(overdraft => res.status(201).send(overdraft))
            .catch(error => res.status(400).send(error));
    },
    getByPk(req, res) {
        return Overdraft.findByPk(req.params.id)
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
                        status: req.body.status,
                        limit: req.body.limit,
                        limitMax: req.body.limitMax,
                        limitUsed: req.body.limitUsed,
                    })
                    .then(() => res.status(200).send(overdraft))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        return Overdraft.findByPk(req.params.id)
            .then(Overdraft => {
                if (!Overdraft) {
                    return res.status(400).send({
                        message: "Overdraft Not Found"
                    });
                }
                return Overdraft
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    activateCredit(req, res) {
        return Overdraft.findByPk(req.params.id)
            .then(overdraft => {
                if (!overdraft) {
                    return res.status(404).send({
                        message: "Overdraft Not Found"
                    });
                }
                return overdraft
                    .update({
                        status: true
                    })
                    .then(() => res.status(200).send(overdraft))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    }

}