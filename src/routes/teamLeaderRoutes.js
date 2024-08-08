const Router = require('koa-router');
const teamLeaderController = require('../controllers/teamLeaderController');
const router = new Router();

router.get('/teamLeaders', teamLeaderController.getAllTeamLeaders);
router.get('/teamLeaders/:id', teamLeaderController.getTeamLeaderById);
router.post('/teamLeaders', teamLeaderController.createTeamLeader);
router.put('/teamLeaders/:id', teamLeaderController.updateTeamLeader);
router.delete('/teamLeaders/:id', teamLeaderController.deleteTeamLeader);

module.exports = router;
