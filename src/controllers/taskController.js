const { Task } = require('../models');

const getAllTasks = async (ctx) => {
  const tasks = await Task.findAll();
  ctx.body = tasks;
};

const getTaskById = async (ctx) => {
  const task = await Task.findByPk(ctx.params.id);
  if (task) {
    ctx.body = task;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Task not found' };
  }
};

const getUserTasks = async (ctx) => {
  const tasks = await Task.findAll({where: {workerId: ctx.params.id}});
  ctx.status = 200;
  ctx.body = tasks;
};

const createTask = async (ctx) => {
  const { name, description, status, workerId, teamLeaderId } = ctx.request.body;
  const newTask = await Task.create({ name, description, status, workerId, teamLeaderId });
  ctx.status = 201;
  ctx.body = newTask;
};

const updateTask = async (ctx) => {
  const { id } = ctx.params;
  const { name, description, status, workerId, teamLeaderId } = ctx.request.body;
  const [updated] = await Task.update({ name, description, status, workerId, teamLeaderId }, {
    where: { id }
  });
  if (updated) {
    const updatedTask = await Task.findByPk(id);
    ctx.body = updatedTask;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Task not found' };
  }
};

const deleteTask = async (ctx) => {
  const { id } = ctx.params;
  const deleted = await Task.destroy({
    where: { id }
  });
  if (deleted) {
    ctx.status = 204;
    ctx.body = 'Task Deleted';
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Task not found' };
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask, getUserTasks };
