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
          name: "Ana",
          cpf: 1234,
          email:"ana@SpeechGrammarList.com",
          phone:"912345678",
          monthlyIncome:3000,
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
