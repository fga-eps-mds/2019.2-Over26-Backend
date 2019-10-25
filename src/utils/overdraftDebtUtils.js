const OverdraftDebt = require("../models").OverdraftDebt;

module.exports = {
    returnInstalmentValue(quantityInstalment, id) {
console.log("AAAAAAAAAAAAAAAAA")
        return OverdraftDebt.findOne({
            where: { userId: id },
            order: [['createdAt', 'DESC']],
        })
            .then(overdraftDebt => {
                if (!overdraftDebt) {
                    return false;
                }
                console.log("BBBBBBBBBBBBBBBBBBBBB")

                const currentDate = new Date();
                console.log("CCCCCCCCCCCCCCCCCCCCCC")

                const dateDiff = currentDate.getTime() - overdraftDebt.entryDate.getTime();
                console.log("DDDDDDDDDDDDDDDDDDDDDD")

                const dateDiffDays = dateDiff / 86400000;
                console.log("EEEEEEEEEEEEEEEEEEEEEEE")

                const dateDiffDaysRound = ((dateDiffDays).toFixed(0));
                console.log("FFFFFFFFFFFFFFFFFFFFFF")


                const totalAmount = overdraftDebt.amount * Math.pow(1 + overdraftDebt.rate, dateDiffDaysRound)
                console.log("GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")

                const instalmentValue = totalAmount / quantityInstalment;//is the value of each instalment
                console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")


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