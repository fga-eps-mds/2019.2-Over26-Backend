'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OverdraftDebts', {
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
      userId: {
        type: DataTypes.INTEGER,
        references: {model:'User', key: 'id'},
        onDelete: 'CASCADE',
        allowNull: false,
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
    return queryInterface.dropTable('OverdraftDebts');

  }
};
