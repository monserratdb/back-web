const { User } = require('../models');
const bcrypt = require('bcryptjs');

const getAllUsers = async (ctx) => {
  console.log("GETTING ALL USERS");
  const users = await User.findAll();
  ctx.body = users;
};

const getUserById = async (ctx) => {
  const user = await User.findByPk(ctx.params.id);
  if (user) {
    ctx.body = user;
  } else {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  }
};

const createUser = async (ctx) => {
  const { username, password, email, role } = ctx.request.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ username, password: hashedPassword, email, role });
  ctx.status = 201;
  ctx.body = newUser;
};

const updateUser = async (ctx) => {
  const { id } = ctx.params;
  const { username, password, email } = ctx.request.body;
  const user = await User.findByPk(id);

  if (user) {
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    ctx.status = 200;
    ctx.body = { message: 'User updated successfully', user };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  }
};

const deleteUser = async (ctx) => {
  const { id } = ctx.params;
  const deleted = await User.destroy({
    where: { id }
  });
  if (deleted) {
    ctx.status = 200;
    ctx.body = 'User successfully deleted';
  } else {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
