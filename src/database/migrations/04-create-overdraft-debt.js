"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("OverdraftDebts", {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            entryDate: {
                type: Sequelize.DATE,
                allowNull: false
            },
            amount: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            rate: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            isDivided: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            dueDay: Sequelize.INTEGER,

            quantityInstalment: Sequelize.INTEGER,

            userId: {
                type: Sequelize.BIGINT,
                onDelete: "CASCADE",
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                    as: "User"
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
        return queryInterface.dropTable("OverdraftDebts");
    }
};
