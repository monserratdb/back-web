const Router = require("koa-router");
const userController = require("../controllers/userController");
const jwtMiddleware = require("koa-jwt");
const dotenv = require('dotenv');
const authUtils = require('../auth/jwt');
const router = new Router();

dotenv.config();

router.post("/users", userController.createUser);

// JWT protected routes below
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }));

router.get("/users", authUtils.isAdmin, userController.getAllUsers);
router.get("/users/:id", authUtils.isAdmin, userController.getUserById);

router.put("/users/:id", authUtils.isAdmin, userController.updateUser);

router.delete("/users/:id", authUtils.isAdmin, userController.deleteUser);
module.exports = router;
