const OverdraftDebt = require("../models").OverdraftDebt;
const User = require("../models").User;
const Overdraft = require("../models").Overdraft;
const Instalment = require("../models").Instalment;

module.exports = {
    create(req, res) {
        return User.findByPk(req.params.id).then(user => {
            console.log(user.cpf);
            return Overdraft.findOne({
                where: {
                    userCPF: user.cpf
                }
            })
                .then(overdraft => {
                    if (!(overdraft.usabilityCheck)) {

                        const rate = 0.5;

                        // const firstUseDate = overdraft.firstUseDate;
                        const firstUseDate = new Date(); // Check if it is null

                        const currentDate = new Date();
                        const entryDate = new Date();
                        entryDate.setDate(firstUseDate.getDate() + 26);
                        //sets entryDate of overdraftDebt to firtUsedDate of overdraft+26days

                        console.log(entryDate);
                        const auxiliarAmount = overdraft.limitUsed;
                        const amountOfDays =
                            (currentDate.getDate() - entryDate.getDate()) / 86400000;
                        //is the amount of days between entering debt and the current date

                        const amount = auxiliarAmount * Math.pow((1 + rate), amountOfDays);
                        //is the amount of money due in the moment of the creation of the overdraftDebt

                        const wasDivided = false;
                        const userCPF = user.cpf;

                        return user.createOverdraftDebt({
                            userCPF: userCPF,
                            entryDate: entryDate,
                            amount: amount,
                            rate: rate,
                            wasDivided: wasDivided
                        });
                    }
                })
                .then(overdraftDebt => res.status(201).send(overdraftDebt))
                .catch(error => res.status(400).send(error));
        });
    },
    getByPk(req, res) {
        return overdraftDebt
            .findByPk(req.params.id)
            .then(overdraftDebt => {
                if (!overdraftDebt) {
                    return res.status(404).send({
                        message: "overdraftDebt Not Found"
                    });
                }
                return res.status(200).send(overdraftDebt);
            })
            .catch(error => res.status(400).send("error"));
    },

    getInstalmentsOptions(req, res) {
        return overdraftDebt.findByPk(req.params.id).then(overdraftDebt => {
            if (req.body.quantInstalments == 1) {
                Instalment = overdraftDebt.amount;
            } else if (req.body.quantInstalments == 2) {
                Instalment = overdraftDebt.amount / 2;
            } else if (req.body.quantInstalments == 3) {
                Instalment = overdraftDebt.amount / 3;
            } else if (req.body.quantInstalments == 4) {
                Instalment = overdraftDebt.amount / 4;
            } else if (req.body.quantInstalments == 5) {
                Instalment = overdraftDebt.amount / 5;
            } else if (req.body.quantInstalments == 6) {
                Instalment = overdraftDebt.amount / 6;
            } else if (req.body.quantInstalments == 7) {
                Instalment = overdraftDebt.amount / 7;
            } else if (req.body.quantInstalments == 8) {
                Instalment = overdraftDebt.amount / 8;
            } else if (req.body.quantInstalments == 9) {
                Instalment = overdraftDebt.amount / 9;
            } else if (req.body.quantInstalments == 10) {
                Instalment = overdraftDebt.amount / 10;
            } else if (req.body.quantInstalments == 11) {
                Instalment = overdraftDebt.amount / 11;
            } else if (req.body.quantInstalments == 12) {
                Instalment = overdraftDebt.amount / 12;
            } else {
                res.status(400).send("Escolha um número de parcelas");
            }

            if (req.body.dueDate == 5) {
                var CurrentDate = new Date();
                var firstMonth = CurrentDate.getMonth() + 1;
                new instalmentDate[req.body.quantInstalments]();
                instalmentDate[0] = new Date(CurrentDate.getFullYear, firstMonth, 5);
                for (i = 1; i <= req.body.quantInstalments; i++) {
                    instalmentDate[i] = new Date(
                        instalmentDate[0].getFullYear,
                        instalmentDate[0].getMonth + 1,
                        5
                    );
                }
            } else if (req.body.dueDate == 10) {
                var CurrentDate = new Date();
                var firstMonth = CurrentDate.getMonth() + 1;
                new instalmentDate[req.body.quantInstalments]();
                instalmentDate[0] = new Date(CurrentDate.getFullYear, firstMonth, 10);
                for (i = 1; i <= req.body.quantInstalments; i++) {
                    instalmentDate[i] = new Date(
                        instalmentDate[0].getFullYear,
                        instalmentDate[0].getMonth + 1,
                        10
                    );
                }
            } else if (req.body.dueDate == 15) {
                var CurrentDate = new Date();
                var firstMonth = CurrentDate.getMonth() + 1;
                new instalmentDate[req.body.quantInstalments]();
                instalmentDate[0] = new Date(CurrentDate.getFullYear, firstMonth, 15);
                for (i = 1; i <= req.body.quantInstalments; i++) {
                    instalmentDate[i] = new Date(
                        instalmentDate[0].getFullYear,
                        instalmentDate[0].getMonth + 1,
                        15
                    );
                }
            } else if (req.body.dueDate == 20) {
                var CurrentDate = new Date();
                var firstMonth = CurrentDate.getMonth() + 1;
                new instalmentDate[req.body.quantInstalments]();
                instalmentDate[0] = new Date(CurrentDate.getFullYear, firstMonth, 20);
                for (i = 1; i <= req.body.quantInstalments; i++) {
                    instalmentDate[i] = new Date(
                        instalmentDate[0].getFullYear,
                        instalmentDate[0].getMonth + 1,
                        20
                    );
                }
            } else if (req.body.dueDate == 25) {
                var CurrentDate = new Date();
                var firstMonth = CurrentDate.getMonth() + 1;
                new instalmentDate[req.body.quantInstalments]();
                instalmentDate[0] = new Date(CurrentDate.getFullYear, firstMonth, 25);
                for (i = 1; i <= req.body.quantInstalments; i++) {
                    instalmentDate[i] = new Date(
                        instalmentDate[0].getFullYear,
                        instalmentDate[0].getMonth + 1,
                        25
                    );
                }
            } else {
                res.status(400).send("Escolha um número de parcelas");
            }
            return res.status(200).send(Instalment);
            return res.status(200).send(instalmentDate[quantInstalments]);
        });
    },

    checkAmount(req, res) {
        return Overdraft.findByPk(req.params.id)
            .then(overdraft => {
                if (!overdraft) {
                    return res.status(404).send({
                        message: "Overdraft Not Found"
                    });
                }
                if (overdraftDebt.entryDate != null) {
                    const currentDate = new Date();
                    const dateDiff =
                        currentDate.getTime() - overdraft.entryDate.getTime();
                    const dateDiffDays = dateDiff * 86400000;
                    amount = (amount * (1 + rate)) ^ dateDiffDays;
                    return res.status(200).send(amount);
                } else {
                    return res.status(400).send({
                        message: "No entry date"
                    });
                }
            })
            .catch(error => res.status(400).send("error"));
    },

    createInstalments(req, res) {
        return overdraftDebt.findByPk(req.params.id).then(overdraftDebt => {
            if (req.body.quantInstalments == 1) {
                Instalment = overdraftDebt.amount;
            } else if (req.body.quantInstalments == 2) {
                Instalment = overdraftDebt.amount / 2;
            } else if (req.body.quantInstalments == 3) {
                Instalment = overdraftDebt.amount / 3;
            } else if (req.body.quantInstalments == 4) {
                Instalment = overdraftDebt.amount / 4;
            } else if (req.body.quantInstalments == 5) {
                Instalment = overdraftDebt.amount / 5;
            } else if (req.body.quantInstalments == 6) {
                Instalment = overdraftDebt.amount / 6;
            } else if (req.body.quantInstalments == 7) {
                Instalment = overdraftDebt.amount / 7;
            } else if (req.body.quantInstalments == 8) {
                Instalment = overdraftDebt.amount / 8;
            } else if (req.body.quantInstalments == 9) {
                Instalment = overdraftDebt.amount / 9;
            } else if (req.body.quantInstalments == 10) {
                Instalment = overdraftDebt.amount / 10;
            } else if (req.body.quantInstalments == 11) {
                Instalment = overdraftDebt.amount / 11;
            } else if (req.body.quantInstalments == 12) {
                Instalment = overdraftDebt.amount / 12;
            } else {
                res.status(400).send("Escolha um número de parcelas");
            }

            if (req.body.dueDate == 5) {
                var CurrentDate = new Date();
                var firstMonth = CurrentDate.getMonth() + 1;
                new instalmentDate[req.body.quantInstalments]();
                instalmentDate[0] = new Date(CurrentDate.getFullYear, firstMonth, 5);
                for (i = 1; i <= req.body.quantInstalments; i++) {
                    instalmentDate[i] = new Date(
                        instalmentDate[0].getFullYear,
                        instalmentDate[0].getMonth + 1,
                        5
                    );
                }
            } else if (req.body.dueDate == 10) {
                var CurrentDate = new Date();
                var firstMonth = CurrentDate.getMonth() + 1;
                new instalmentDate[req.body.quantInstalments]();
                instalmentDate[0] = new Date(CurrentDate.getFullYear, firstMonth, 10);
                for (i = 1; i <= req.body.quantInstalments; i++) {
                    instalmentDate[i] = new Date(
                        instalmentDate[0].getFullYear,
                        instalmentDate[0].getMonth + 1,
                        10
                    );
                }
            } else if (req.body.dueDate == 15) {
                var CurrentDate = new Date();
                var firstMonth = CurrentDate.getMonth() + 1;
                new instalmentDate[req.body.quantInstalments]();
                instalmentDate[0] = new Date(CurrentDate.getFullYear, firstMonth, 15);
                for (i = 1; i <= req.body.quantInstalments; i++) {
                    instalmentDate[i] = new Date(
                        instalmentDate[0].getFullYear,
                        instalmentDate[0].getMonth + 1,
                        15
                    );
                }
            } else if (req.body.dueDate == 20) {
                var CurrentDate = new Date();
                var firstMonth = CurrentDate.getMonth() + 1;
                new instalmentDate[req.body.quantInstalments]();
                instalmentDate[0] = new Date(CurrentDate.getFullYear, firstMonth, 20);
                for (i = 1; i <= req.body.quantInstalments; i++) {
                    instalmentDate[i] = new Date(
                        instalmentDate[0].getFullYear,
                        instalmentDate[0].getMonth + 1,
                        20
                    );
                }
            } else if (req.body.dueDate == 25) {
                var CurrentDate = new Date();
                var firstMonth = CurrentDate.getMonth() + 1;
                new instalmentDate[req.body.quantInstalments]();
                instalmentDate[0] = new Date(CurrentDate.getFullYear, firstMonth, 25);
                for (i = 1; i <= req.body.quantInstalments; i++) {
                    instalmentDate[i] = new Date(
                        instalmentDate[0].getFullYear,
                        instalmentDate[0].getMonth + 1,
                        25
                    );
                }
            } else {
                res.status(400).send("Escolha um número de parcelas");
            }
            return;
            for (i = 1; i <= req.body.quantInstalments; i++) {
                instalment.create({
                    isPaid: false,
                    value: Instalment,
                    dueDate: instalmentDate[i],
                    overdraftDebtId: OverdraftDebt.id
                });
            }
        });
    }
};
