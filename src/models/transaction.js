'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    date: DataTypes.DATE,
    type: DataTypes.STRING(30),
    description: DataTypes.STRING(256),
    value: DataTypes.DECIMAL(10,2),
  }, {});

  Transaction.associate = function(models) {
    // associations can be defined here
  };
  return Transaction;
};