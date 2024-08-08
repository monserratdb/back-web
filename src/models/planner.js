'use strict';
module.exports = (sequelize, DataTypes) => {
  const Planner = sequelize.define('Planner', {
    name: DataTypes.STRING,
    teamLeaderId: DataTypes.INTEGER,
    managerId: DataTypes.INTEGER,
    //progress: DataTypes.INTEGER,
    //description: DataTypes.STRING,
    //goal: DataTypes.STRING
  }, {});
  Planner.associate = function(models) {
    // associations can be defined here
    Planner.belongsTo(models.TeamLeader, { foreignKey: 'teamLeaderId' });
    Planner.belongsTo(models.Manager, { foreignKey: 'managerId' });

  };
  return Planner;
};
