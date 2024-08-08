'use strict';
module.exports = (sequelize, DataTypes) => {
  const TeamLeader = sequelize.define('TeamLeader', {
    name: DataTypes.STRING,
    managerId: DataTypes.INTEGER
  }, {});
  TeamLeader.associate = function(models) {
    // associations can be defined here
    TeamLeader.belongsTo(models.Manager, { foreignKey: 'managerId' });
    TeamLeader.hasMany(models.Worker, { foreignKey: 'teamLeaderId' });
    TeamLeader.hasMany(models.Planner, { foreignKey: 'teamLeaderId' });
    TeamLeader.hasMany(models.Task, { foreignKey: 'teamLeaderId' });
  };
  return TeamLeader;
};
