"use strict";
module.exports = (sequelize, DataTypes) => {
  const Installment = sequelize.define("Installment", {

    isPaid: DataTypes.BOOLEAN,
    value: DataTypes.FLOAT,
    dueDate: DataTypes.DATE,
    overdraftDebtId: DataTypes.INTEGER

  });
  Installment.associate = function (models) {
    Installment.belongsTo(models.OverdraftDebt, {
      foreignKey: "id"
    })
  };
  return Installment;
};