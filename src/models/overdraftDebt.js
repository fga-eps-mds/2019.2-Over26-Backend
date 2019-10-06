'use strict';
module.exports = (sequelize, DataTypes) => {
  const OverdraftDebt = sequelize.define('OverdraftDebt', {
   entryDate: DataTypes.DATE,
   amount: DataTypes.FLOAT,
   rate: DataTypes.FLOAT,
   wasDivided: DataTypes.BOOLEAN,
   dueDay: DataTypes.INTEGER,
   quantityInstalment: DataTypes.INTEGER,

   
  }, {});
  OverdraftDebt.associate = function(models) {
    // associations can be defined here
   OverdraftDebt.hasMany(models.Instalment,{
     foreignKey: 'id'
    })
   OverdraftDebt.belongsTo(models.User,{ 
      foreignKey: 'userCPF',
    })
  };
  return OverdraftDebt;
};