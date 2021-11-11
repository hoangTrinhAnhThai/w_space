const Task = require('../models/Task');
const Project = require('../models/Project');
const { body, validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
require('dotenv').config();

class TaskController {
  showTaskById = [
    (req, res) => {
      Project.findById(req.params.id ).populate('tasks').then((project) => {
        return apiResponse.successResponseWithData(
          res,
          'Get tasks success',
          project,
        );
      })

      // 
    }
  ]
  createTask = [
    body('name')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Task name must be specified'),
    body('description')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Task description must be specified'),
    (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return apiResponse.validationErrorWithData(
            res,
            'Validation Error',
            errors.array(),
          );
        } else {
          let task = new Task();
          task.name = req.body.name;
          task.description = req.body.description;

          return Task.create(task).then(docTask => {
            Project.findByIdAndUpdate(
              req.params.id,
              { $push: { tasks: docTask._id } },
              { new: true, useFindAndModify: false }
            ).then((result) => {
              return apiResponse.successResponseWithData(
                res,
                'Add task success',
                result,
              );
            }
            );
          });
        }
      } catch (error) {
        return apiResponse.ErrorResponse(res, error);
      }
    },
  ];
  editTask = [
    body('name')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Task name must be specified'),
    body('description')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Task description must be specified'),
    (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return apiResponse.validationErrorWithData(
            res,
            'Validation Error',
            errors.array(),
          );
        } else {
          let task = new Task();
          task.name = req.body.name;
          task.description = req.body.description;

          return Task.create(task).then(docTask => {
            Project.findByIdAndUpdate(
              req.params.id,
              { $push: { tasks: docTask._id } },
              { new: true, useFindAndModify: false }
            ).then((result) => {
              return apiResponse.successResponseWithData(
                res,
                'Add task success',
                result,
              );
            }
            );
          });
            
        }
      } catch (error) {
        return apiResponse.ErrorResponse(res, error);
      }
    }
  ]
}
module.exports = new TaskController();