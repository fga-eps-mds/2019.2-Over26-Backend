"use strict";
module.exports = (sequelize, DataTypes) => {
  const Installment = sequelize.define(
    "Installment",
    {
      id_installment: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      is_paid: DataTypes.BOOLEAN,
      value: DataTypes.FLOAT,
      due_date: DataTypes.DATE
    },
    {}
  );
  Installment.associate = function (models) {
    Installment.belongsTo(models.OverdraftDebt,{
      foreignKey: "id_overdraft_debt",
      as: "OverdraftDebt"
    })
  };
  Installment.removeAttribute("id");
  return Installment;
};