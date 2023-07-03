const express = require('express');
const router = express.Router();
const statusController = require('../../app/controllers/project/StatusController');
const { statusValidation } = require('../../middleware/validation');

// status
router.get('/', statusController.showStatus);
router.post('/', statusValidation(), statusController.createStatus);

module.exports = router;
