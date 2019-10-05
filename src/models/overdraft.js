"use strict";
module.exports = (sequelize, DataTypes) => {
  const Overdraft = sequelize.define(
    "Overdraft",
    {
      id_overdraft: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      is_blocked: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      limit: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      limitMax: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      limitUsed: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
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