'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Accounts', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            agency: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            number: {
                type: Sequelize.INTEGER,
                autoIncrement: true
            },
            balance: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            userId: {
                type: Sequelize.BIGINT,
                onDelete: 'CASCADE',
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'User'
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
        return queryInterface.dropTable('Accounts');
    }
};
