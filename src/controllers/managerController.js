const { Manager } = require('../models');

const getAllManagers = async (ctx) => {
  const managers = await Manager.findAll();
  ctx.body = managers;
};

const getManagerById = async (ctx) => {
  const manager = await Manager.findByPk(ctx.params.id);
  if (manager) {
    ctx.body = manager;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Manager not found' };
  }
};

const createManager = async (ctx) => {
  const { name, userId } = ctx.request.body;
  const newManager = await Manager.create({ name, userId });
  ctx.status = 201;
  ctx.body = newManager;
};

const updateManager = async (ctx) => {
  const { id } = ctx.params;
  const { name, userId } = ctx.request.body;
  const [updated] = await Manager.update({ name, userId }, {
    where: { id }
  });
  if (updated) {
    const updatedManager = await Manager.findByPk(id);
    ctx.body = updatedManager;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Manager not found' };
  }
};

const deleteManager = async (ctx) => {
  const { id } = ctx.params;
  const deleted = await Manager.destroy({
    where: { id }
  });
  if (deleted) {
    ctx.status = 204;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Manager not found' };
  }
};

module.exports = { getAllManagers, getManagerById, createManager, updateManager, deleteManager };
