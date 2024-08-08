const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const rootRoutes = require('./src/routes/rootRoutes');  // Importar las rutas raíz
const userRoutes = require('./src/routes/userRoutes');
const managerRoutes = require('./src/routes/managerRoutes');
const teamLeaderRoutes = require('./src/routes/teamLeaderRoutes');
const workerRoutes = require('./src/routes/workerRoutes');
const plannerRoutes = require('./src/routes/plannerRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const authRoutes = require('./src/routes/authRoutes');
const { sequelize } = require('./src/models');
const logger = require('koa-logger');

const webSocketsServerPort = 8000;
const WebSocketServer = require('websocket').server;
const http = require('http');

const app = new Koa();
app.use(logger());
app.use(bodyParser());
app.use(cors());

app.use(rootRoutes.routes()).use(rootRoutes.allowedMethods()); // Usar las rutas raíz primero
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());
app.use(userRoutes.routes()).use(userRoutes.allowedMethods());
app.use(managerRoutes.routes()).use(managerRoutes.allowedMethods());
app.use(teamLeaderRoutes.routes()).use(teamLeaderRoutes.allowedMethods());
app.use(workerRoutes.routes()).use(workerRoutes.allowedMethods());
app.use(plannerRoutes.routes()).use(plannerRoutes.allowedMethods());
app.use(taskRoutes.routes()).use(taskRoutes.allowedMethods());

const server = http.createServer(app.callback());
server.listen(webSocketsServerPort, () => {
  console.log(`WebSocket server is listening on port ${webSocketsServerPort}`);
});

const wsServer = new WebSocketServer({
  httpServer: server,
});

const users = {};

const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function (request) {
  const userID = getUniqueID();
  console.log((new Date()) + ' Received a new connection from origin ' + request.origin + '.');

  const connection = request.accept(null, request.origin);
  users[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(users));

  connection.on('message', function (message) {
    if (message.type === 'utf8') {
      console.log('Received Message: ', message.utf8Data);

      // broadcasting message to all connected users
      for (let key in users) {
        users[key].sendUTF(message.utf8Data);
        console.log('sent Message to: ', users[key]);
      }
    }
  });

  connection.on('close', function () {
    delete users[userID];
    console.log('disconnected: ' + userID);
  });
});

//const PORT = process.env.PORT || 3000;

/*
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
*/
