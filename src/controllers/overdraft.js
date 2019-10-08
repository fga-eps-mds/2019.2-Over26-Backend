const Overdraft = require("../models").Overdraft;
const User = require("../models").User;

module.exports = {
    list(req, res) {
        return Overdraft.findAll()
            .then(overdrafts => res.status(200).send(overdrafts))
            .catch(error => {
                res.status(400).send(error);
            });
    },
    create(req, res) {
        return User.findByPk(req.params.id)
            .then(user => {
                const status = false;
                const userId = user.id;
                const limit = 200;
                const limitMax = 200;
                const limitUsed = 0;
                const firstUseDate = null;

                return user
                    .createOverdraft({
                        userId: userId,
                        status: status,
                        limit: limit,
                        limitMax: limitMax,
                        limitUsed: limitUsed,
                        firstUseDate: firstUseDate
                    })
                    .then(overdraft => res.status(201).send(overdraft))
                    .catch(error => res.status(400).send(error));
            })
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
    updateCreditLimit(req, res) {
        const { limit } = req.body;
        return Overdraft.findByPk(req.params.id)
            .then(overdraft => {
                if (!overdraft) {
                    return res.status(404).send({
                        message: "Overdraft Not Found"
                    });
                }
                if (limit - overdraft.limitUsed < 0 || limit - overdraft.limitMax > 0) {
                    return res.status(400).send({
                        message: "Limit Used exceeds choosen limit"
                    });
                }

                return overdraft
                    .update({
                        status: req.body.status,
                        limit: req.body.limit,
                        limitMax: req.body.limitMax,
                        limitUsed: req.body.limitUsed,
                        firstUseDate: req.body.firstUseDate
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
                    return res.status(404).send({
                        message: "Overdraft Not Found"
                    });
                }
                return Overdraft.destroy()
                    .then(() => res.status(204).send())
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },
    activateCredit(req, res) {
        return User.findByPk(req.params.id)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User Not Found"
                    });
                }
                return user.getOverdraft().then(overdraft => {
                    if (!overdraft) {
                        return res.status(404).send({
                            message: "Overdraft Not Found"
                        });
                    }
                    overdraft
                        .update({
                            status: true
                        })
                        .then(overdraft => res.status(200).send(overdraft))
                        .catch(error => res.status(400).send(error));
                });
            })
            .catch(error => res.status(400).send(error));
    },

    checkUsability(req, res) {
        return Overdraft.findOne({
            where: {
                userId: req.params.id
            }
        }).then(overdraft => {
            if (!overdraft) {
                return res.status(404).send({
                    message: "Overdraft Not Found"
                });
            }
            if (overdraft.firstUseDate != null) {
                const currentDate = new Date();
                const dateDiff =
                    currentDate.getTime() - overdraft.firstUseDate.getTime();
                const dateDiffDays = dateDiff / 86400000;

                if (dateDiffDays > 26) {

                    return res.status(418).send(false);
                } else {

                    return res.status(200).send(true);
                }
            } else {
                return res.status(200).send(true);
            }
        });
    },
    usabilityCheck(req) {
        return Overdraft.findOne({
            where: {
                userId: req
            }
        }).then(overdraft => {
            if (!overdraft) {
                return true;
            }
            if (overdraft.firstUseDate != null) {
                const currentDate = new Date();
                const dateDiff =
                    currentDate.getTime() - overdraft.firstUseDate.getTime();
                const dateDiffDays = dateDiff / 86400000;

                if (dateDiffDays > 26) {

                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        });
    },
    cancelCredit(req, res) {
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
