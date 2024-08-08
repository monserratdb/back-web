'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TeamLeaders', [{
      name: 'Team Leader One',
      id: 1, 
      managerId: 1, // Asegúrate de que este ID exista en la tabla Managers
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TeamLeaders', null, {});
  }
};
