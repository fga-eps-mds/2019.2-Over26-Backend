"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Installments", {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            isPaid: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            value: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            dueDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            overdraftDebtId: {
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                allowNull: false,
                references: {
                    model: "OverdraftDebts",
                    key: "id",
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
