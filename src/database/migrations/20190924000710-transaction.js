"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Transactions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(30)
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
                type: Sequelize.DECIMAL(10, 2)
            },
            accountNumber: {
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                references: {
                    model: "Accounts",
                    key: "number",
                    as: "accountNumber"
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
