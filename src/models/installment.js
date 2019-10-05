"use strict";
module.exports = (sequelize, DataTypes) => {
  const Installment = sequelize.define(
    "Installment",
    {
      id_installment: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      is_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: false
      }
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