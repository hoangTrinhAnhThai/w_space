const express = require('express');
const router = express.Router();
const logtimeController = require('../../app/controllers/logtime/LogtimeController');

router.get('/task/:task', logtimeController.showAllLogtimeByTask);
router.get('/:id', logtimeController.showLogtime);
router.get('/', logtimeController.showAllLogtime);

router.post('/:date', logtimeController.showAllLogtimeByDate);
router.post('/', logtimeController.createLogtime);
router.delete('/:id', logtimeController.deleteLogtime);
router.put('/:id', logtimeController.updateLogtime);

module.exports = router;
