const OverdraftDebt = require("../models").OverdraftDebt;

module.exports= {
    returnInstalmentDates(req, res) {

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
                const quantityInstalment = req.query.quantityInstalment;//qunatity of instalments
                const instalmentValue = totalAmount / quantityInstalment;//is the value of each instalment

                const dueDay = req.query.day;//due day on each month for the instalments
                var dateOptionsForInstalments = new Array();
                var counter = 1;
                const counterMax = parseInt(quantityInstalment, 10) + 1;
                while (counter < counterMax) {

                    dateOptionsForInstalments.push(new Date(currentDate.getFullYear(), (currentDate.getMonth() + counter), dueDay, 23, 59, 59, 999));
                    counter++;

                }


                return dateOptionsForInstalments; 
                    

            }

    },
   }