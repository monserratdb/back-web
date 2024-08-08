const Router = require('koa-router');
const workerController = require('../controllers/workerController');
const router = new Router();

router.get('/workers', workerController.getAllWorkers);
router.get('/workers/:id', workerController.getWorkerById);
router.post('/workers', workerController.createWorker);
router.put('/workers/:id', workerController.updateWorker);
router.delete('/workers/:id', workerController.deleteWorker);

module.exports = router;
