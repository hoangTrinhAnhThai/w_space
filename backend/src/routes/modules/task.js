const express = require('express');
const router = express.Router();
const taskController = require('../../app/controllers/project/TaskController');

require('dotenv').config();

const {
  taskValidation,
} = require('../../middleware/validation');

// task
router.get('/:idProject', taskController.showAllTask);
// router.get('/task/:id', taskValidation(), taskController.showTask);
// router.post('/:id/task', taskValidation(), taskController.createTask);
// router.put('/task/:id', taskValidation(), taskController.editTask);

module.exports = router;
