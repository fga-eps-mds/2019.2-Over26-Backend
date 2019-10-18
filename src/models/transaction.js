"use strict";
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define("Transaction", {

        name: DataTypes.STRING(30),
        date: DataTypes.DATE,
        type: DataTypes.STRING(30),
        description: DataTypes.STRING(256),
        value: DataTypes.DECIMAL(10, 2),
    });
    Transaction.associate = function (models) {
        Transaction.belongsTo(models.Account, {
            foreignKey: "id",
            //as: "account"
        });
    };
    return Transaction;
};
