"use strict";
module.exports = (sequelize, DataTypes) => {
  const OverdraftDebt = sequelize.define(
    "OverdraftDebt",
    {
      id_overdraft_debt: {
        type: DataTypes.BIGINT,
        primaryKey: true
      },
      entry_date: DataTypes.DATE,
      amount: DataTypes.FLOAT,
      rate: DataTypes.FLOAT,
      is_divided: DataTypes.BOOLEAN,
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