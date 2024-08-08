const Router = require('koa-router');
const taskController = require('../controllers/taskController');
const router = new Router();

router.get('/tasks', taskController.getAllTasks);
router.get('/tasks/:id', taskController.getTaskById);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

router.get('/users/:id/tasks', taskController.getUserTasks);

module.exports = router;
