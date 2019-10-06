"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      cpf: { type: DataTypes.BIGINT },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.BIGINT,
      monthly_income: DataTypes.DECIMAL(10, 2)
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Account, {
      foreignKey: 'userID',
    });
    User.hasMany(models.OverdraftDebt, {
      foreignKey: "userID",
      as: "OverdraftDebts"
    });
    User.hasOne(models.Overdraft, {
      foreignKey: 'userID',
    });
  };
  return User;
};
