'use strict';
module.exports = (sequelize, DataTypes) => {
  const Manager = sequelize.define('Manager', {
    name: DataTypes.STRING
  }, {});
  Manager.associate = function(models) {
    // associations can be defined here
    Manager.belongsTo(models.User, { foreignKey: 'userId' });
    Manager.hasMany(models.TeamLeader, { foreignKey: 'managerId' });
    Manager.hasMany(models.Planner, { foreignKey: 'managerId' });
  };
  return Manager;
};
