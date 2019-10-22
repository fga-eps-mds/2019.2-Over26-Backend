"use strict";
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Users", {
            id: {
                type: Sequelize.BIGINT,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            cpf: {
                type: Sequelize.BIGINT,
                allowNull: false,
                //unique: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                //unique: true
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: false
            },
            monthlyIncome: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
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
        return queryInterface.dropTable("Users");
    }
};