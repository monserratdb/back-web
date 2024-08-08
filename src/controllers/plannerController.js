const { Planner } = require('../models');

const getAllPlanners = async (ctx) => {
  const planners = await Planner.findAll();
  ctx.body = planners;
};

const getPlannerById = async (ctx) => {
  const planner = await Planner.findByPk(ctx.params.id);
  if (planner) {
    ctx.body = planner;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Planner not found' };
  }
};

const createPlanner = async (ctx) => {
  try {
    const { name, description, progress, goal, teamLeaderId, managerId } = ctx.request.body;

    if (!name) {
      ctx.status = 400;
      ctx.body = { error: 'Name is required' };
      return;
    }

    const newPlanner = await Planner.create({ name, description, progress, goal, teamLeaderId, managerId });

    ctx.status = 201;
    ctx.body = newPlanner;
  } catch (error) {
    ctx.status = 500;
    console.error('Error creating planner:', error);
  }
};

const updatePlanner = async (ctx) => {
  const { id } = ctx.params;
  const { name, teamLeaderId } = ctx.request.body;
  const [updated] = await Planner.update({ name, teamLeaderId }, {
    where: { id }
  });
  if (updated) {
    const updatedPlanner = await Planner.findByPk(id);
    ctx.body = updatedPlanner;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Planner not found' };
  }
};

const deletePlanner = async (ctx) => {
  const { id } = ctx.params;
  const deleted = await Planner.destroy({
    where: { id }
  });
  if (deleted) {
    ctx.status = 204;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Planner not found' };
  }
};

module.exports = { getAllPlanners, getPlannerById, createPlanner, updatePlanner, deletePlanner };
