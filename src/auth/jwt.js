const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function getJWTScope(token) {
  let payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload.scope;
}

async function isUser(ctx, next) {
  await next();
  var token = ctx.request.header.authorization.split(" ")[1];
  var scope = getJWTScope(token);
  ctx.assert(scope.includes("user"), 403, "Forbidden access.");
}

async function isManager(ctx, next) {
  await next();
  var token = ctx.request.header.authorization.split(" ")[1];
  var scope = getJWTScope(token);
  ctx.assert(scope.includes("manager"), 403, "Forbidden access.");
}

async function isAdmin(ctx, next) {
  await next();
  var token = ctx.request.header.authorization.split(" ")[1];
  var scope = getJWTScope(token);
  ctx.assert(scope.includes("admin"), 403, "Forbidden access.");
}

module.exports = { isUser, isManager, isAdmin };
