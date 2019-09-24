'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      type: {
        type: Sequelize.STRING(30)
      },
      description: {
        type: Sequelize.STRING(256)
      },
      value: {
        type: Sequelize.DECIMAL(10,2)
      },
      accountNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // Account belongsTo User 1:1
          model: 'Accounts',
          key: 'number'
        }
      },
      agencyNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {         // Account belongsTo User 1:1
          model: 'Accounts',
          key: 'agency'
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

    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};
