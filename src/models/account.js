"use strict";
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      id_account: DataTypes.BIGINT,
      agency: DataTypes.INTEGER,
      number: DataTypes.INTEGER,
      balance: DataTypes.DECIMAL(10, 2)
      });
      
  Account.associate = function(models) {
    Account.belongsTo(models.User, {
      foreignKey: "id_user",
      as: "User"
    });
    Account.hasMany(models.Transaction, {
      foreignKey: "id_transaction",
      as: "Transactions"
    });
  };
  Account.removeAttribute("id");

  return Account;
};
