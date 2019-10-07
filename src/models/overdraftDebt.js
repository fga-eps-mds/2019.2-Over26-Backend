"use strict";
module.exports = (sequelize, DataTypes) => {
  const OverdraftDebt = sequelize.define(
    "OverdraftDebt",
    {
      id_overdraft_debt: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      entry_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      rate: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      is_divided: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      due_date: DataTypes.INTEGER,
      quantity_installment: DataTypes.INTEGER,
    },
    {}
  );
  OverdraftDebt.associate = function(models) {
   OverdraftDebt.hasMany(models.Installment,{
      foreignKey: "id_installment",
      as: "Installments"
    })
   OverdraftDebt.belongsTo(models.User,{ 
      foreignKey: "id_user",
      as: "User"
    })
  };
  OverdraftDebt.removeAttribute("id");
  return OverdraftDebt;
};