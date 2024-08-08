'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verifica que los IDs existen en las tablas correspondientes
    const workers = await queryInterface.sequelize.query(
      'SELECT id FROM "Workers" WHERE name = \'Worker One\';',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const teamLeaders = await queryInterface.sequelize.query(
      'SELECT id FROM "TeamLeaders" WHERE name = \'Team Leader One\';',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Asegúrate de que las consultas retornan resultados
    if (workers.length === 0 || teamLeaders.length === 0) {
      throw new Error('No se encontraron los IDs requeridos en las tablas Workers o TeamLeaders.');
    }

    return queryInterface.bulkInsert('Tasks', [{
      name: 'Task One',
      description: 'This is the first task',
      status: 'pending',
      workerId: workers[0].id, // Usa el ID retornado de la consulta
      teamLeaderId: teamLeaders[0].id, // Usa el ID retornado de la consulta
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
