"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Accounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
     },
      agency: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      balance: {
        type: Sequelize.DECIMAL(10, 2)
      },
      userID: {
        type: Sequelize.BIGINT,
        onDelete: "CASCADE",
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
          as: "userID"
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
