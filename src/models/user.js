"use strict";
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        cpf: DataTypes.BIGINT,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        monthlyIncome: DataTypes.DECIMAL(10, 2)
    });
    User.associate = function (models) {
        User.hasOne(models.Account, {
            foreignKey: "id",
            as: "AccountId"
        });
        User.hasOne(models.Overdraft, {
            foreignKey: "id",
            as: "OverdraftId"
        });
        User.hasMany(models.OverdraftDebt, {
            foreignKey: "userId",
            as: "OverdraftDebts"
        });
    };
    return User;
};
