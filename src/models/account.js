"use strict";
module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define("Account", {
        agency: DataTypes.INTEGER,
        number: DataTypes.INTEGER,
        balance: DataTypes.DECIMAL(10, 2)
    });

    Account.associate = function (models) {
        Account.belongsTo(models.User, {
            foreignKey: "UserId",
        });
        Account.hasMany(models.Transaction, {
            foreignKey: "accountNumber",
            as: "transactions"
        });
    };

    return Account;
};
