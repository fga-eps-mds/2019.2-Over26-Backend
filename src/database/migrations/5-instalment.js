'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Instalments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    isPaid: {
      type: Sequelize.BOOLEAN
    },
    value: {
      type: Sequelize.FLOAT
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    dueDate:{
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    overdraftDebtId: {
      type: Sequelize.INTEGER,
      references: {model:'OverdraftDebts',
       key: 'id',
      as:"overdraftDebtId"},
      onDelete: 'CASCADE',
      allowNull: false,
    }
  });
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.dropTable('Instalments');
  }
};
