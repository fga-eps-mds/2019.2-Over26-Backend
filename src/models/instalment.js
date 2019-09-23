'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instalment = sequelize.define('Instalment', {
    isPaid: DataTypes.BOOLEAN,
    value: DataTypes.FLOAT,
    dueDate: DataTypes.DATE
  
   
  }, {});
  Instalment.associate = function(models) {
    // associations can be defined here
  };
  return Instalment;
};