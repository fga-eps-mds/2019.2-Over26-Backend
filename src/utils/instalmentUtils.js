const OverdraftDebt = require("../models").OverdraftDebt;

module.exports = {
    returnInstalmentUtils(req, res) {
        return OverdraftDebt.findOne({
            where: {
                userCPF: req.params.cpf,
                wasDivided: false,
            },
            order: [['createdAt', 'DESC']],
        })
            .then(async overdraftDebt => {

                if (!overdraftDebt) {
                    return res.status(404).send({
                        message: "Non divided OverdraftDebt Not Found"
                    });
                }
                const instalmentValue = await OverdraftDebtUtils.returnInstalmentValue(req.body.quantityInstalment, overdraftDebt.userCPF);

                const dateOptionsForInstalments = await OverdraftDebtUtils.returnInstalmentDates(req.body.day, req.body.quantityInstalment, overdraftDebt.userCPF);

                var instalments = new Array();

                const dueDay = req.body.day;//due day on each month for the instalments
                const quantityInstalment = req.body.quantityInstalment;

                var counter = 0;
                const counterMax = parseInt(quantityInstalment, 10);
                while (counter < counterMax) {

                    instalments.push(await instalmentController.create(instalmentValue, dateOptionsForInstalments[counter], overdraftDebt.id))
                    counter++;
                }
}