'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('Users', {
			// id: {
			//   allowNull: false,
			//   autoIncrement: true,
			//   primaryKey: true,
			//   type: Sequelize.INTEGER
			// },
			cpf: {
				type: Sequelize.BIGINT,
				unique: true,
				primaryKey: true,
				allowNull: false,

			},
			name: {
				type: Sequelize.STRING
			},
			email: {
				type: Sequelize.STRING
			},
			phone: {
				type: Sequelize.BIGINT
			},
			monthly_income: {
				type: Sequelize.DECIMAL(10, 2)
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
		return queryInterface.dropTable('Users');
	}
};