
const OverdraftDebt = require("../models").OverdraftDebt;
const User = require("../models").User;
const Overdraft = require("../models").Overdraft;
const Instalment = require("../models").Instalment;
const overdraftController = require('./overdraft');
const instalmentController = require('./instalment');
const OverdraftUtils = require("../utils/overdraftUtils");
const OverdraftDebtUtils = require("../utils/overdraftDebtUtils");
const InstalmentUtils = require("../utils/instalmentUtils");




module.exports = {
    create(req, res) {
        return User.findByPk(req.params.id)
            .then(user => {
                return Overdraft.findOne({
                    where: {
                        userId: user.id
                    }
                })
                    .then(async overdraft => {
                        if (!(await OverdraftUtils.usabilityCheck(overdraft.userId))) {
                            const rate = 0.003182;

                            const firstUseDate = overdraft.firstUseDate;

                            const entryDate = firstUseDate;
                            entryDate.setDate(entryDate.getDate() + 26);
                            //sets entryDate of overdraftDebt to firtUsedDate of overdraft+26days


                            const amount = overdraft.limitUsed;
                            //is the amount of money due in the moment of the debt start

                            const isDivided = false;
                            const userId = user.id;
                            return user.createOverdraftDebt({
                                userId: userId,
                                entryDate: entryDate,
                                amount: amount,
                                rate: rate,
                                isDivided: isDivided
                            }).then(overdraftDebt => res.status(201).send(overdraftDebt));
                        } else {
                            return res.status(400).send({
                                message: "overdraft still haven't reached it's deadline or wasn't used"
                            });
                        }
                    })

                    .catch(error => res.status(400).send('error'));
            })
            .catch(error => res.status(400).send('error'));

    },
    getByPk(req, res) {
        return OverdraftDebt.findByPk(req.params.id)
            .then(overdraftDebt => {
                if (!overdraftDebt) {
                    return res.status(404).send({
                        message: "OverdraftDebt Not Found"
                    });
                }
                return res.status(200).send(overdraftDebt);
            })
            .catch(error => res.status(400).send("error"));
    },
    getInstalmentsOptions(req, res) {

        return OverdraftDebt.findOne({
            where: { userId: req.params.id },
            order: [['createdAt', 'DESC']],
        })
            .then(async overdraftDebt => {

                if (!overdraftDebt) {
                    return res.status(404).send({
                        message: "OverdraftDebt Not Found"
                    });
                }
                const instalmentValue = await OverdraftDebtUtils.returnInstalmentValue(req.body.quantityInstalment, overdraftDebt.userId);

                const dateOptionsForInstalments = await OverdraftDebtUtils.returnInstalmentDates(req.body.day, req.body.quantityInstalment, overdraftDebt.userId);

                return res.status(200).send({
                    "valueOfIndividualInstalment": instalmentValue,
                    "dateOptionsForInstalments": dateOptionsForInstalments,

                })
            })
            .catch(error => res.status(400).send("error"));
    },
    checkAmount(req, res) {
        return OverdraftDebt.findOne({
            where: { userId: req.params.id },
            order: [['createdAt', 'DESC']]
        })
            .then(async overdraftDebt => {
                if (!overdraftDebt) {
                    return res.status(404).send({
                        message: "OverdraftDebt Not Found"
                    });
                }

                const totalAmount = await OverdraftDebtUtils.returnInstalmentValue(1, overdraftDebt.userId);

                return res.status(200).send({
                    "totalAmount": totalAmount,
                });

            })
            .catch(error => res.status(400).send("error"));
    },
    createInstalments(req, res) {
        return OverdraftDebt.findOne({
            where: {
                userId: req.params.id,
                isDivided: false,
            },
            order: [['createdAt', 'DESC']],


        })
            .then(async overdraftDebt => {
                if (!overdraftDebt) {
                    return res.status(404).send({
                        message: "Non divided OverdraftDebt Not Found"
                    });
                }
                const instalmentValue = await OverdraftDebtUtils.returnInstalmentValue(req.body.quantityInstalment, overdraftDebt.userId);
                const dateOptionsForInstalments = await OverdraftDebtUtils.returnInstalmentDates(req.body.day, req.body.quantityInstalment, overdraftDebt.userId);
                var instalments = new Array();
                const dueDay = req.body.day;//due day on each month for the instalments
                const quantityInstalment = req.body.quantityInstalment;
                var counter = 0;
                const counterMax = parseInt(quantityInstalment, 10);
                while (counter < counterMax) {
                    instalments.push(await InstalmentUtils.creatInstalment(instalmentValue, dateOptionsForInstalments[counter], overdraftDebt.id));
                    counter++;

                }
                await overdraftDebt.update({
                    isDivided: true,
                    dueDay: parseInt(dueDay, 10),
                    quantityInstalment: parseInt(quantityInstalment, 10),
                })
                return res.status(200).send(instalments)

            })
            .catch(error => res.status(400).send({ "message": "couldn't create instalments" }));
    },
};