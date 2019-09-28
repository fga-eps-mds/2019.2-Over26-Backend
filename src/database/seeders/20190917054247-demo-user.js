"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "João",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

    return queryInterface.bulkInsert(
      "Overdraft",
      [
        {
          user: Luiza,
	  id_overdraft: 1111111111,
          solicitation_date: new Date(),
          status: true,
    	  limit: 100.11,
          limit_max: 200.00,
          limit_used: 11.11,
          name: "João",
          email: "joao@demo.com",
          phone: 11111111111,
          monthly_income: 111.11,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete("Accounts", null, {});
    return queryInterface.bulkDelete("Overdraft", null, {});
  }
};
