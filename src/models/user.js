'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Manager, { foreignKey: 'userId' });
    User.hasMany(models.TeamLeader, { foreignKey: 'userId' });
    User.hasMany(models.Worker, { foreignKey: 'userId' });
  };
  return User;
};
