const Overdraft = require("../models").Overdraft;
const User = require("../models").User;
const OverdraftUtils = require("../utils/overdraftUtils");
const OverdrafDebttUtils = require("../utils/overdraftDebtUtils")

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
                if(!user){
                    return res.status(404).send({"message":"User not found"});
                }
                const userId = user.id;
                const isActive = false;
                const isBlocked = false;
                const limit = 200;
                const limitMax = 200;
                const limitUsed = 0;
                const firstUseDate = null;
                return user.createOverdraft({
                        userId: userId,
                        isActive: isActive,
                        isBlocked: isBlocked,
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
                        isActive: req.body.isActive,
                        isBlocked:req.body.isBlocked,
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
                            isActive: true
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
        }).then(async overdraft => {
            if (!overdraft) {
                return res.status(404).send({
                    message: "Overdraft Not Found"
                });
            } else {
                return res.status(200).send(await OverdraftUtils.usabilityCheck(req.params.id));
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
                        isBlocked: true
                    })
                    .then(() => res.status(200).send(overdraft))
                    .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
    },

    createDebt(req, res) {
        return Overdraft.findOne({
            where: {
                userId: req.params.id
            }
        }).then(async overdraft => {
            if (!overdraft) {
                return res.status(404).send({
                    message: "Overdraft Not Found"
                });
                }
                
                const currentDate = new Date()
               
                var Debt 
                firstUseDate = new Date(currentDate.getTime() - (27 * 24 * 60 * 60 * 1000) )
                console.log(firstUseDate)
                id = req.body.id
                console.log(idUser)
               // Debt = await OverdrafDebttUtils.create(id);
                return overdraft
                    .update({
                    
                    firstUseDate : new Date(currentDate.getTime() - (27 * 24 * 60 * 60 * 1000) )
                })
                
                .then(() => res.status(200).send(firstUseDate))
                .catch(error => res.status(400).send(error));
            }
            )

            .catch(error => res.status(400).send(error));
    }
};
