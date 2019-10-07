"use strict";
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("Overdrafts", {
			id_overdraft: {
				type: Sequelize.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				allowNull: false
			},
			is_blocked: {
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
			user_id: {
				type: Sequelize.BIGINT,
				onDelete: "CASCADE",
				allowNull: false,
				references: {
					model: "Users",
					key: "id_user",
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
		return queryInterface.dropTable("Overdrafts");
	}
};
