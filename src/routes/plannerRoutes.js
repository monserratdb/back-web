const Router = require('koa-router');
const plannerController = require('../controllers/plannerController');
const router = new Router();

router.get('/planners', plannerController.getAllPlanners);
router.get('/planners/:id', plannerController.getPlannerById);
router.post('/planners', plannerController.createPlanner);
router.put('/planners/:id', plannerController.updatePlanner);
router.delete('/planners/:id', plannerController.deletePlanner);

module.exports = router;
