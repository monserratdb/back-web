'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Managers', [{
      name: 'Manager One',
      id: 1,
      userId: 1, // Asegúrate de que este ID exista en la tabla Users
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Managers', null, {});
  }
};
