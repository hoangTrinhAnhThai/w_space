const express = require('express');
const router = express.Router();
const projectController = require('../../app/controllers/ProjectController');
const taskController = require('../../app/controllers/TaskController');
const {
  projectValidation,
  taskValidation,
} = require('../../middleware/validation');

// task
router.get('/tasks/', taskValidation(), taskController.showAllTask);
router.get('/task/:id', taskValidation(), taskController.showTask);
router.post('/:id/task', taskValidation(), taskController.createTask);
router.put('/task/:id', taskValidation(), taskController.editTask);
router.delete('/:idProject/:idTask', taskController.deleteTask);
router.post('/task', taskController.moveCard);

// project
router.get('/:id', projectController.showProject);
router.get('/', projectController.showAllProjects);
router.post('/', projectValidation(), projectController.createProject);
router.put('/:id', projectController.editProject);
router.delete('/:id', projectController.deleteProject);
router.put('/:id/member', projectController.removeMember);

module.exports = router;
