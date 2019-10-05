"use strict";
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      id_transaction: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      type: {
        type: DataTypes.STRING(30),
        allowNull: false
      },
      description: DataTypes.STRING(256),
      value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    },
    {}
  );
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Account, {
      foreignKey: "number",
      as: "AccountNumber"
    });
  };
  Transaction.removeAttribute("id");
  return Transaction;
};
