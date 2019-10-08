'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Overdrafts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			status: {
				type: Sequelize.BOOLEAN
			},
			limit: {
				type: Sequelize.DECIMAL(10, 2)
			},
			limitMax: {
				type: Sequelize.DECIMAL(10, 2)
			},
			limitUsed: {
				type: Sequelize.DECIMAL(10, 2)
			},
			firstUseDate: {
				type: Sequelize.DATE
			},
			userID: {
				unique: true,
				primaryKey: true,
				type: Sequelize.BIGINT,
				onDelete: "CASCADE",
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
					as: "userID"
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
