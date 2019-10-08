"use strict";
module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define("Account", {
        agency: DataTypes.INTEGER,
        number: DataTypes.INTEGER,
        balance: DataTypes.DECIMAL(10, 2)
    });
    Account.associate = function (models) {
        Account.belongsTo(models.User, {
            foreignKey: "id",
            as: "userId"
        });
        Account.hasMany(models.Transaction, {
            foreignKey: "id",
            as: "Transactions"
        });
    };
    return Account;
};
