"use strict";
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      cpf: DataTypes.BIGINT(11),
      agency: {
        type: DataTypes.INTEGER(10)
      },
      number: {
        primaryKey: true,
        unique: true,
        type: DataTypes.INTEGER(10)
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
