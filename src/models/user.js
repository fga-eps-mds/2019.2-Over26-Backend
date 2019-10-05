"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id_user: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      cpf: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      monthly_income: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    },
    {}
  );
  User.associate = function(models) {
    User.hasOne(models.Account, {
      foreignKey: "id_account",
      as: "Account"
    });
    User.hasOne(models.Overdraft, {
      foreignKey: "id_overdraft",
      as: "Overdraft"
    });
    User.hasMany(models.OverdraftDebt, {
      foreignKey: "id_overdraft_debt",
      as: "OverdraftDebts"
    }); 
  };
  User.removeAttribute("id");
  return User;
};
