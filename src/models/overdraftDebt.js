"use strict";
module.exports = (sequelize, DataTypes) => {
    const OverdraftDebt = sequelize.define("OverdraftDebt", {
        entryDate: DataTypes.DATE,
        amount: DataTypes.FLOAT,
        rate: DataTypes.FLOAT,
        wasDivided: DataTypes.BOOLEAN,
        dueDay: DataTypes.INTEGER,
        quantityInstalment: DataTypes.INTEGER,

    }, {});
    OverdraftDebt.associate = function (models) {

        OverdraftDebt.hasMany(models.Installment, {
            foreignKey: "id",
        })
        OverdraftDebt.belongsTo(models.User, {
            as: "userId"
        })
    };
    return OverdraftDebt;
};