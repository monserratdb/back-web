const { TeamLeader } = require('../models');

const getAllTeamLeaders = async (ctx) => {
  const teamLeaders = await TeamLeader.findAll();
  ctx.body = teamLeaders;
};

const getTeamLeaderById = async (ctx) => {
  const teamLeader = await TeamLeader.findByPk(ctx.params.id);
  if (teamLeader) {
    ctx.body = teamLeader;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Team Leader not found' };
  }
};

const createTeamLeader = async (ctx) => {
  const { name, managerId } = ctx.request.body;
  const newTeamLeader = await TeamLeader.create({ name, managerId });
  ctx.status = 201;
  ctx.body = newTeamLeader;
};

const updateTeamLeader = async (ctx) => {
  const { id } = ctx.params;
  const { name, managerId } = ctx.request.body;
  const [updated] = await TeamLeader.update({ name, managerId }, {
    where: { id }
  });
  if (updated) {
    const updatedTeamLeader = await TeamLeader.findByPk(id);
    ctx.body = updatedTeamLeader;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Team Leader not found' };
  }
};

const deleteTeamLeader = async (ctx) => {
  const { id } = ctx.params;
  const deleted = await TeamLeader.destroy({
    where: { id }
  });
  if (deleted) {
    ctx.status = 204;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Team Leader not found' };
  }
};

module.exports = { getAllTeamLeaders, getTeamLeaderById, createTeamLeader, updateTeamLeader, deleteTeamLeader };
