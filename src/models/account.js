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
      userId: DataTypes.INTEGER
    },
    {}
  );
  Account.associate = function(models) {
    Account.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user"
    });
    Account.hasMany(models.Transaction, {
      foreignKey: "accountNumber",
      as: "transactions"
    });
  };
  Account.removeAttribute("id");

  return Account;
};
