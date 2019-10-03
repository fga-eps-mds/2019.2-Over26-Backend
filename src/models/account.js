"use strict";
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      agency: {
        type: DataTypes.INTEGER
      },
      number: {
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER
      },
      balance: DataTypes.DECIMAL(10, 2),
    },
    {}
  );
  Account.associate = function(models) {
    Account.belongsTo(models.User, {
      foreignKey: "userCPF"
    });
    Account.hasMany(models.Transaction, {
      foreignKey: "accountNumber",
      as: "transactions"
    });
  };
  Account.removeAttribute("id");

  return Account;
};
