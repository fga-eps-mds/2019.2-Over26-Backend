"use strict";
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      agency: DataTypes.INTEGER(10),
      number: { type: DataTypes.INTEGER(10), primaryKey: true, unique: true },
      balance: DataTypes.DECIMAL(10, 2)
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
  return Account;
};
