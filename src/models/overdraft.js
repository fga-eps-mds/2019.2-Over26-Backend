"use strict";
module.exports = (sequelize, DataTypes) => {
  const Overdraft = sequelize.define(
    "Overdraft",
    {
      id_overdraft: DataTypes.BIGINT,
      is_active: DataTypes.BOOLEAN,
      is_blocked: DataTypes.BOOLEAN,
      limit: DataTypes.DECIMAL(10, 2),
      limitMax: DataTypes.DECIMAL(10, 2),
      limitUsed: DataTypes.DECIMAL(10, 2),
      firstUseDate: DataTypes.DATE
    },
    {}
  );
  Overdraft.associate = function(models) {
    Overdraft.belongsTo(models.User,{ 
      foreignKey: "id_user",
      as: "User"
    })
  };
  Overdraft.removeAttribute("id");
  return Overdraft;
};