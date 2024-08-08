'use strict';
module.exports = (sequelize, DataTypes) => {
  const Worker = sequelize.define('Worker', {
    name: DataTypes.STRING,
    teamLeaderId: DataTypes.INTEGER
  }, {});
  Worker.associate = function(models) {
    // associations can be defined here
    Worker.belongsTo(models.TeamLeader, { foreignKey: 'teamLeaderId' });
    Worker.hasMany(models.Task, { foreignKey: 'workerId' });
  };
  return Worker;
};
