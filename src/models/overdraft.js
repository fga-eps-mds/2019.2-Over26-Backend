'use strict';
module.exports = (sequelize, DataTypes) => {
  const Overdraft = sequelize.define('Overdraft', {
    user: DataTypes.BIGINT(11),
    id_overdraft: DataTypes.INTEGER(10),
    solicitation_date: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    limit: DataTypes.DECIMAL(10, 2),
    limit_max: DataTypes.DECIMAL(10, 2),
    limit_used: DataTypes.DECIMAL(10, 2)
  }, {});
  Overdraft.associate = function(models) {
    // associations can be defined here
  };
  return Overdraft;
};