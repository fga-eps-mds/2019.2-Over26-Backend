const OverdraftDebt = require("../models").OverdraftDebt;

module.exports = {
    returnInstalmentDates(day, quantityInstalment, instalmentValue, cpf) {

        return OverdraftDebt.findOne({
            where: { userCPF: cpf },
            order: [['createdAt', 'DESC']],
        })
            .then(overdraftDebt => {

                if (!overdraftDebt) {
                    return 0;
                }

                const currentDate = new Date();
                const dateDiff = currentDate.getTime() - overdraftDebt.entryDate.getTime();
                const dateDiffDays = dateDiff / 86400000;
                const dateDiffDaysRound = ((dateDiffDays).toFixed(0));

                const totalAmount = overdraftDebt.amount * Math.pow(1 + overdraftDebt.rate, dateDiffDaysRound)
                instalmentValue = totalAmount / quantityInstalment;//is the value of each instalment

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