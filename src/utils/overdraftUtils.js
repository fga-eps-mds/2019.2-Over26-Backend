const Overdraft = require("../models").Overdraft;

module.exports = {
    usabilityCheck(id) {
        return Overdraft.findOne({
            where: {
                userId: id
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