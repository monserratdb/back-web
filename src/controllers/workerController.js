const { Worker } = require('../models');

const getAllWorkers = async (ctx) => {
  const workers = await Worker.findAll();
  ctx.body = workers;
};

const getWorkerById = async (ctx) => {
  const worker = await Worker.findByPk(ctx.params.id);
  if (worker) {
    ctx.body = worker;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Worker not found' };
  }
};

const createWorker = async (ctx) => {
  const { name, teamLeaderId } = ctx.request.body;
  const newWorker = await Worker.create({ name, teamLeaderId });
  ctx.status = 201;
  ctx.body = newWorker;
};

const updateWorker = async (ctx) => {
  const { id } = ctx.params;
  const { name, teamLeaderId } = ctx.request.body;
  const [updated] = await Worker.update({ name, teamLeaderId }, {
    where: { id }
  });
  if (updated) {
    const updatedWorker = await Worker.findByPk(id);
    ctx.body = updatedWorker;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Worker not found' };
  }
};

const deleteWorker = async (ctx) => {
  const { id } = ctx.params;
  const deleted = await Worker.destroy({
    where: { id }
  });
  if (deleted) {
    ctx.status = 204;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'Worker not found' };
  }
};

module.exports = { getAllWorkers, getWorkerById, createWorker, updateWorker, deleteWorker };
