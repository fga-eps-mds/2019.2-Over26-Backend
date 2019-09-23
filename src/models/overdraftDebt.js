'use strict';
module.exports = (sequelize, DataTypes) => {
  const OverdraftDebt = sequelize.define('OverdraftDebt', {
   entryDate: DataTypes.DATE,
   amount: DataTypes.FLOAT,
   rate: DataTypes.FLOAT,
   wasDivided: DataTypes.BOOLEAN,
   
  }, {});
  OverdraftDebt.associate = function(models) {
    // associations can be defined here
  };
  return OverdraftDebt;
};