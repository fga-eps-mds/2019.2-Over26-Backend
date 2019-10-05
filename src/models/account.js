"use strict";
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    "Account",
    {
      id_account: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      agency: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true        
      },
      balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    },
    {}
  );
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
