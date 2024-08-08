'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Planners', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      teamLeaderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'TeamLeaders',
          key: 'id'
        }
      },
      /*
      description: {
        type: Sequelize.STRING
      },
      progress: {
        type: Sequelize.INTEGER
      },
      goal: {
        type: Sequelize.STRING
      },
      */
      managerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Managers',
          key: 'id'
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
    return queryInterface.dropTable('Planners');
  }
};
