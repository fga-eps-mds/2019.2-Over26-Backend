const OverdraftDebt = require("../models").OverdraftDebt;
const User = require("../models").User;
const Overdraft = require("../models").Overdraft;
const Instalment = require("../models").Instalment;
const overdraftController = require('./overdraft');




module.exports = {
    create(req, res) {
        return User.findByPk(req.params.id).then(user => {
            console.log(user.cpf);
            return Overdraft.findOne({
                where: {
                    userCPF: user.cpf
                }
            })
                .then(async overdraft => {
                    console.log(overdraft.firstUseDate)
                    console.log(await overdraftController.usabilityCheck(user.cpf))
                    if (!(await overdraftController.usabilityCheck(user.cpf))) {
                        console.log(user.cpf)
                        const rate = 0.15;

                        const firstUseDate = overdraft.firstUseDate;

                        const entryDate = firstUseDate;
                        entryDate.setDate(entryDate.getDate() + 26);
                        //sets entryDate of overdraftDebt to firtUsedDate of overdraft+26days


                        const amount = overdraft.limitUsed;
                        //is the amount of money due in the moment of the debt start

                        const wasDivided = false;
                        const userCPF = user.cpf;

                        return user.createOverdraftDebt({
                            userCPF: userCPF,
                            entryDate: entryDate,
                            amount: amount,
                            rate: rate,
                            wasDivided: wasDivided
                        }).then(overdraftDebt => res.status(201).send(overdraftDebt));
                    } else {
                        return res.status(400).send({
                            message: "overdraft still haven't reached it's deadline or wasn't used"
                        });
                    }
                })

                .catch(error => res.status(400).send('error'));
        });
    },
    getByPK(req, res) {
        console.log("entrou")
        return OverdraftDebt.findByPK(req.params.id)
            .then(overdraftDebt => {
                if (!overdraftDebt) {
                    return res.status(404).send({
                        message: "Overdraft Not Found"
                    });
                }
                return res.status(200).send(overdraftDebt);
            })
            .catch(error => res.status(400).send("error"));
    },

    getInstalmentsOptions(req, res) {

        return OverdraftDebt.findOne({
            where: { userCPF: req.params.cpf },
            order: [['createdAt', 'DESC']],
        })
            .then(overdraftDebt => {

                if (!overdraftDebt) {
                    return res.status(404).send({
                        message: "OverdraftDebt Not Found"
                    });
                }

                const currentDate = new Date();
                const dateDiff = currentDate.getTime() - overdraftDebt.entryDate.getTime();
                const dateDiffDays = dateDiff / 86400000;
                const dateDiffDaysRound = ((dateDiffDays).toFixed(0));


                const totalAmount = overdraftDebt.amount * Math.pow(1 + overdraftDebt.rate, dateDiffDaysRound)
                const quantityInstalment = req.body.quantityInstalment;//qunatity of instalments
                const instalmentValue = totalAmount / quantityInstalment;//is the value of each instalment

                const dueDay = req.body.day;//due day on each month for the instalments
                var dateOptionsForInstalments = new Array();
                var counter = 1;
                const counterMax = parseInt(quantityInstalment, 10) + 1;
                while (counter < counterMax) {

                    dateOptionsForInstalments.push(new Date(currentDate.getFullYear(), (currentDate.getMonth() + counter), dueDay, 23, 59, 59, 999));
                    counter++;

                }
                console.log(dateOptionsForInstalments);


                return res.status(200).send({
                    "valueOfIndividualInstalment": instalmentValue,
                    "dateOptionsForInstalments": dateOptionsForInstalments,

                })

            })
            .catch(error => res.status(400).send("error"));

    },

    checkAmount(req, res) {

        return OverdraftDebt.findOne({
            where: { userCPF: req.params.cpf },
            order: [['createdAt', 'DESC']]
        })
            .then(overdraftDebt => {
                if (!overdraftDebt) {
                    return res.status(404).send({
                        message: "OverdraftDebt Not Found"
                    });
                }
                const currentDate = new Date();
                const dateDiff = currentDate.getTime() - overdraftDebt.entryDate.getTime();
                const dateDiffDays = dateDiff / 86400000;
                const dateDiffDaysRound = ((dateDiffDays).toFixed(0));
                const totalAmount = overdraftDebt.amount * Math.pow(1 + overdraftDebt.rate, dateDiffDaysRound)
                return res.status(200).send({ "totalAmount": totalAmount });

            })
            .catch(error => res.status(400).send("error"));
    },

    createInstalments(req, res) {
        return overdraftDebt.findOne({
            where: { userCPF: req.params.cpf },
            order: [['createdAt', 'DESC']]
        })
            .then(overdraftDebt => {
                if (!overdraftDebt) {
                    return res.status(404).send({
                        message: "OverdraftDebt Not Found"
                    });
                }
                const currentDate = new Date();
                const dateDiff = currentDate.getTime() - overdraftDebt.entryDate.getTime();
                const dateDiffDays = dateDiff / 86400000;
                const dateDiffDaysRound = ((dateDiffDays).toFixed(0));
                const totalAmount = overdraftDebt.amount * Math.pow(1 + overdraftDebt.rate, dateDiffDaysRound)

                const quantityInstalment = req.body.quantityInstalment;
                instalmentValue = totalAmount / quantityInstalment;

                const dueDay = req.body.day;

                if (req.body.dueDate == 5) {
                    var CurrentDate = new Date();
                    var firstMonth = CurrentDate.getMonth() + 1;
                    new instalmentDate[req.body.quantityInstalments]();
                    instalmentDate[0] = new Date(CurrentDate.getFullYear, firstMonth, 5);
                    for (i = 1; i <= req.body.quantityInstalment; i++) {
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
