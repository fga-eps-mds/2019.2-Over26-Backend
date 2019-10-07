"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Installments", {
    id_installment: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    is_paid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    value: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    due_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    id_overdraft_debt: {
      type: Sequelize.INTEGER,
      onDelete: "CASCADE",
      allowNull: false,
      references: {
        model: "OverdraftDebts",
        key: "id_overdraft_debt",
        as: "OverdraftDebt"
      }      
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable("Installments");
  }
};
