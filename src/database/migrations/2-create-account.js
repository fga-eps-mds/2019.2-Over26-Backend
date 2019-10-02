"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Accounts", {
      agency: {
        type: Sequelize.INTEGER(10),
        allowNull: false
      },
      number: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      balance: {
        type: Sequelize.DECIMAL(10, 2)
      },
      userCPF: {
        type: Sequelize.BIGINT,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: "Users",
          key: "cpf",
          as: "userCPF"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Accounts");
  }
};
