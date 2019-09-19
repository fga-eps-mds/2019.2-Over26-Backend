'use strict';
module.exports = (sequelize, DataTypes) => {
  const Overdraft = sequelize.define('Overdraft', {
    status: DataTypes.BOOLEAN,
    limit: DataTypes.DECIMAL(10),
    limitMax: DataTypes.DECIMAL,
    limitUsed: DataTypes.DECIMAL,
    solicitedAt: DataTypes.DATE
   
  }, {});
  Overdraft.associate = function(models) {
    // associations can be defined here
  };
  return Overdraft;
};