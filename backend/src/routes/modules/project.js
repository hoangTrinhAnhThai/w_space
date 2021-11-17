const express = require('express');
const router = express.Router();
const projectController = require('../../app/controllers/ProjectController');
const taskController = require('../../app/controllers/TaskController');
const statusController = require('../../app/controllers/StatusController');
const {
  projectValidation,
  taskValidation,
  statusValidation,
} = require('../../middle-ware/validation');

// status
router.get('/status', statusController.showStatus);
router.post('/status', statusValidation(), statusController.createStatus);

// task
router.post('/:id/task', taskValidation(), taskController.createTask);
router.put('/task/:id', taskValidation(), taskController.editTask);
router.delete('/task/:id', taskController.deleteTask);
router.post('/task', taskController.moveCard);

// project
router.get('/:id', projectController.showProject);
router.get('/', projectController.showAllProjects);
router.post('/', projectValidation(), projectController.createProject);
router.put('/:id', projectValidation(), projectController.editProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;
