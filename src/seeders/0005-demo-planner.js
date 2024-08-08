'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Verifica que los IDs existen en las tablas correspondientes
    const managers = await queryInterface.sequelize.query(
      'SELECT id FROM "Managers" WHERE name = \'Manager One\';',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const teamLeaders = await queryInterface.sequelize.query(
      'SELECT id FROM "TeamLeaders" WHERE name = \'Team Leader One\';',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Asegúrate de que las consultas retornan resultados
    if (managers.length === 0 || teamLeaders.length === 0) {
      throw new Error('No se encontraron los IDs requeridos en las tablas Workers o TeamLeaders.');
    }

    return queryInterface.bulkInsert('Planners', [{
      name: 'Planner One',
      managerId: managers[0].id, // Usa el ID retornado de la consulta
      teamLeaderId: teamLeaders[0].id, // Usa el ID retornado de la consulta
      //description: 'Plan number 1',
      //progress: 0,
      //goal: 'Increase Earnings',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Planners', null, {});
  }
};
