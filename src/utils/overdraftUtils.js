const Overdraft = require("../models").Overdraft;

module.exports = {
    usabilityCheck(cpf) {
        return Overdraft.findOne({
            where: {
                userCPF: cpf
            }
        }).then(overdraft => {
            if (!overdraft) {
                return true;
            }
            if (overdraft.firstUseDate != null) {
                const currentDate = new Date();
                const dateDiff =
                    currentDate.getTime() - overdraft.firstUseDate.getTime();
                const dateDiffDays = dateDiff / 86400000;

                if (dateDiffDays > 26) {

                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        });
    },





}