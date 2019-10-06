"use strict";
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      agency: {
        type: DataTypes.INTEGER
      },
      number: {
        unique: true,
        type: DataTypes.INTEGER
      },
      balance: DataTypes.DECIMAL(10, 2),
    },
    {}
  );
  Account.associate = function(models) {
    Account.belongsTo(models.User, {
      foreignKey: "userID"
    });
    Account.hasMany(models.Transaction, {
      foreignKey: "accountID",
      as: "transactions"
    });
  };

  return Account;
};
