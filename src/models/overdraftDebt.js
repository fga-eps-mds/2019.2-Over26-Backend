"use strict";
module.exports = (sequelize, DataTypes) => {
    const OverdraftDebt = sequelize.define("OverdraftDebt", {
        entryDate: DataTypes.DATE,
        amount: DataTypes.FLOAT,
        rate: DataTypes.FLOAT,
        isDivided: DataTypes.BOOLEAN,
        dueDay: DataTypes.INTEGER,
        quantityInstalment: DataTypes.INTEGER,
    });
    OverdraftDebt.associate = function (models) {
        OverdraftDebt.hasMany(models.Instalment, {
            foreignKey: "id",
            as: "instalment"
        })
        OverdraftDebt.belongsTo(models.User, {
            foreignKey: "id",
            as: "userId"
        })
    };
    return OverdraftDebt;
};