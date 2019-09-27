'use strict';
module.exports = (sequelize, DataTypes) => {
  const Overdraft = sequelize.define('Overdraft', {
    status: DataTypes.BOOLEAN,
    limit: DataTypes.DECIMAL(10,2),
    limitMax: DataTypes.DECIMAL(10,2),
    limitUsed: DataTypes.DECIMAL(10,2),
    solicitationDate: DataTypes.DATE
   
  }, {});
  Overdraft.associate = function(models) {
    // associations can be defined here
  };
  return Overdraft;
};