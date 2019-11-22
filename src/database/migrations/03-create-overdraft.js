'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Overdrafts', {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            isBlocked: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            limit: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            limitMax: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            limitUsed: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            firstUseDate: Sequelize.DATE,
            
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
        return queryInterface.dropTable('Overdrafts');
    }
};
