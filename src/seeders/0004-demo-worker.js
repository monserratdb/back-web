'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Workers', [{
      name: 'Worker One',
      id: 1,
      teamLeaderId: 1, // Asegúrate de que este ID exista en la tabla TeamLeaders
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Workers', null, {});
  }
};
