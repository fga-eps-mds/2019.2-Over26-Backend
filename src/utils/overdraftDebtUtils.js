const OverdraftDebt = require("../models").OverdraftDebt;

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
                console.log("overdraftDebt")
                console.log(overdraftDebt)
                
                const currentDate = new Date();
                console.log("currentDate:")
                console.log(currentDate)

                const dateDiff = currentDate.getTime() - overdraftDebt.entryDate.getTime();
                console.log("dateDiff:")
                console.log(dateDiff)

                const dateDiffDays = dateDiff / 86400000;
                console.log("dateDiffDays:")
                console.log(dateDiffDays)

                const dateDiffDaysRound = ((dateDiffDays).toFixed(0));
                console.log("dateDiffDaysRound:")
                console.log(dateDiffDaysRound)


                const totalAmount = overdraftDebt.amount * Math.pow(1 + overdraftDebt.rate, dateDiffDaysRound)
                console.log("totalAmount:")
                console.log(totalAmount)

                const instalmentValue = totalAmount / quantityInstalment;//is the value of each instalment
                console.log("instalmentValue:")
                console.log(instalmentValue)


                return instalmentValue;

            })


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
}