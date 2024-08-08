'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    workerId: DataTypes.INTEGER,
    teamLeaderId: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.Worker, { foreignKey: 'workerId' });
    Task.belongsTo(models.TeamLeader, { foreignKey: 'teamLeaderId' });
  };
  return Task;
};

