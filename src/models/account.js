'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    cpf: DataTypes.BIGINT(11),
    agency: DataTypes.INTEGER(10),
    number: DataTypes.INTEGER(10),
    balance: DataTypes.DECIMAL(10, 2)
  }, {});
  Account.associate = function(models) {
    // associations can be defined here
  };
  return Account;
};