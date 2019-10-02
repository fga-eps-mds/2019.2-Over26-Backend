"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("OverdraftDebts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      entryDate: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.FLOAT
      },
      rate: {
        type: Sequelize.FLOAT
      },
      wasDivided: {
        type: Sequelize.BOOLEAN
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
      dueDay:{
        type: Sequelize.INTEGER
      },
      quantityInstalment:{
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable("OverdraftDebts");
  }
};
