"use strict";
module.exports = (sequelize, DataTypes) => {
  const Overdraft = sequelize.define("Overdraft", {
      isActive: DataTypes.BOOLEAN,
      isBlocked: DataTypes.BOOLEAN,
      limit: DataTypes.DECIMAL(10, 2),
      limitMax: DataTypes.DECIMAL(10, 2),
      limitUsed: DataTypes.DECIMAL(10, 2),
      firstUseDate: DataTypes.DATE
    });
  Overdraft.associate = function(models) {
    Overdraft.belongsTo(models.User,{ 
      foreignKey: "id",
      as: "userId"
    })
  };
  return Overdraft;
};