const express = require('express');
const router = express.Router();
const projectController = require('../../app/controllers/ProjectController');
const taskController = require('../../app/controllers/TaskController');
const statusController = require('../../app/controllers/StatusController');

router.get('/status/', statusController.showStatus);
router.post('/status/', statusController.createStatus);
router.post('/:id/task/', taskController.createTask);

router.get('/:id', projectController.showProject);
router.get('/', projectController.showAllProjects);
router.post('/', projectController.createProject);

module.exports = router;