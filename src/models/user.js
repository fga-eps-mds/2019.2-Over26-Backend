"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id_user: DataTypes.BIGINT,
      cpf: DataTypes.BIGINT,
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      monthly_income: DataTypes.DECIMAL(10, 2)
    },
    {}
  );
  User.associate = function(models) {
    User.hasOne(models.Account, {
      foreignKey: "id_account",
      as: "Account"
    });
    User.hasOne(models.Overdraft, {
      foreignKey: "id_overdraft",
      as: "Overdraft"
    });
    User.hasMany(models.OverdraftDebt, {
      foreignKey: "id_overdraft_debt",
      as: "OverdraftDebts"
    }); 
  };
  User.removeAttribute("id");
  return User;
};
