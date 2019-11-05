const OverdraftDebt = require("../models").OverdraftDebt;
const Overdraft = require("../models").Overdraft;
const OverdraftUtils = require("../utils/overdraftUtils");
const User = require("../models").User

module.exports = {
    returnInstalmentValue(quantityInstalment, id) {
        return OverdraftDebt.findOne({
            where: { userId: id },
            order: [['createdAt', 'DESC']],
        })
            .then(overdraftDebt => {
                if (!overdraftDebt) {
                    return false;
                }

                const currentDate = new Date();

                const dateDiff = currentDate.getTime() - overdraftDebt.entryDate.getTime();
                const dateDiffDays = dateDiff / 86400000;
                const dateDiffDaysRound = ((dateDiffDays).toFixed(0));

                const totalAmount = overdraftDebt.amount * Math.pow(1 + overdraftDebt.rate, dateDiffDaysRound);
                
                const instalmentValue = totalAmount / quantityInstalment;//is the value of each instalment
              

                return instalmentValue;

            });


    },

    returnInstalmentDates(day, quantityInstalment, id) {

        return OverdraftDebt.findOne({
            where: { userId: id },
            order: [['createdAt', 'DESC']],
        })
            .then(overdraftDebt => {

                if (!overdraftDebt) {
                    return 0;
                }

                const currentDate = new Date();
                const dueDay = day;//due day on each month for the instalments
                var dateOptionsForInstalments = new Array();
                var counter = 1;
                const counterMax = parseInt(quantityInstalment, 10) + 1;
                while (counter < counterMax) {

                    dateOptionsForInstalments.push(new Date(currentDate.getFullYear(), (currentDate.getMonth() + counter), dueDay, 23, 59, 59, 999));
                    counter++;

                }


                return dateOptionsForInstalments;


            }

            );
    },

    create(id) {
        return User.findByPk(id)
            .then(user => {
                return Overdraft.findOne({
                    where: {
                        userId: user.id,
                        isBlocked:false
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
                            }).then(async overdraftDebt => {
                                await overdraft.update({
                                    isBlocked: true,
                                    limitUsed:0
                                })
                                return overdraftDebt;
                            });
                        } else {
                            return null;
                        }
                    })

                    .catch(error => {return null});
                })
            .catch(error => {return null});

    },
}
