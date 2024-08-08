const Router = require('koa-router');
const managerController = require('../controllers/managerController');
const router = new Router();

router.get('/managers', managerController.getAllManagers);
router.get('/managers/:id', managerController.getManagerById);
router.post('/managers', managerController.createManager);
router.put('/managers/:id', managerController.updateManager);
router.delete('/managers/:id', managerController.deleteManager);

module.exports = router;
