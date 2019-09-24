'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    cpf: DataTypes.BIGINT(11),
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.BIGINT,
    monthly_income: DataTypes.DECIMAL(10, 2)
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.OverdraftDebt)
  };
  return User;
};