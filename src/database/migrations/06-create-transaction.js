"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Transactions", {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            name: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            type: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            description: Sequelize.STRING(256),
            value: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            accountId: {
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                allowNull: false,
                references: {
                    model: "Accounts",
                    key: "id",
                    as: "Account"
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
        return queryInterface.dropTable("Transactions");
    }
};
