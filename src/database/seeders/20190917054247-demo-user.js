
"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
      
        return queryInterface.bulkInsert(
            "Users",
            [
                {
                    name: "Ana",
                    cpf: 12345678912,
                    email: "ana@SpeechGrammarList.com",
                    phone: "61912345678",
                    monthlyIncome: 3000,
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
    }
};