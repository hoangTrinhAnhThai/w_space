const express = require('express');
const router = express.Router();
const logtimeController = require('../../app/controllers/LogtimeController');

router.get('/:id', logtimeController.showLogtime);
router.get('/', logtimeController.showAllLogtime);
router.post('/:date', logtimeController.showAllLogtimeByDate);
router.post('/', logtimeController.createLogtime);
router.delete('/:id', logtimeController.deleteLogtime);
router.put('/:id', logtimeController.updateLogtime);
router.get('/task/:task', logtimeController.showAllLogtimeByTask);

module.exports = router;
