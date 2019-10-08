'use strict';
module.exports = (sequelize, DataTypes) => {
  const Overdraft = sequelize.define('Overdraft', {
    status: DataTypes.BOOLEAN,
    limit: DataTypes.DECIMAL(10,2),
    limitMax: DataTypes.DECIMAL(10,2),
    limitUsed: DataTypes.DECIMAL(10,2),
    firstUseDate: DataTypes.DATE
   
  }, {});
  Overdraft.associate = function(models) {
    // associations can be defined here
    Overdraft.belongsTo(models.User,{ 
      foreignKey: 'userID',
    })
  };
  return Overdraft;
};