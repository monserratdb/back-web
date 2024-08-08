const Router = require("koa-router");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const secret = process.env.JWT_SECRET || "your_secret_key";

const router = new Router();

router.post("/register", async (ctx) => {
  console.log(ctx.request.body);
  const { username, email, password, role } = ctx.request.body;
  let existing_user_email = await User.findOne({ where: { email: email } });
  let existing_user_name = await User.findOne({
    where: { username: username },
  });
  if (existing_user_email) {
    ctx.status = 400;
    ctx.body = "The email is already in use";
    return;
  }
  if (existing_user_name) {
    ctx.status = 400;
    ctx.body = "The username is already in use";
    return;
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    ctx.status = 201;
    ctx.body = newUser;
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
    return;
  }
});

router.post("/login", async (ctx) => {
  const { email, password } = ctx.request.body;
  const user = await User.findOne({ where: { email } });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const expSeconds = 1 * 60 * 60 * 24;
      let token = jwt.sign(
        { scope: [user.role] },
        secret,
        { subject: user.id.toString() },
        { expiresIn: expSeconds }
      );
      ctx.body = {
        user_id: user.id,
        username: user.username,
        email: user.email,
        access_token: token,
        token_type: "Bearer",
        expires_in: expSeconds,
      };
      ctx.status = 200;
    }
  } else {
    ctx.status = 401;
    ctx.body = { error: 'Invalid email or password' };
  }
});

router.post('/logout', async (ctx) => {
  ctx.body = { message: 'Logout successful' };
});

router.delete('/users/:id', async (ctx) => {
  const { id } = ctx.params;
  const user = await User.findByPk(id);

  if (user) {
    await user.destroy();
    ctx.status = 200; // Cambia el estado a 200
    ctx.body = { message: 'User deleted successfully' };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  }
});

router.put('/users/:id', async (ctx) => {
  const { id } = ctx.params;
  const { username, email, role } = ctx.request.body;
  const user = await User.findByPk(id);

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;
    
    await user.save();
    ctx.status = 200;
    ctx.body = { message: 'User updated successfully', user };
  } else {
    ctx.status = 404;
    ctx.body = { error: 'User not found' };
  }
});

module.exports = router;