const Task = require('../models/Task');
const Project = require('../models/Project');
const { body, validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class TaskController {
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
          Project.findOne({ _id: req.params.id }).then((pr) => {
            if (pr) {
              let task = new Task();
              task.name = req.body.name;
              task.description = req.body.description;

              task.save(function (err) {
                if (err) {
                  return apiResponse.ErrorResponse(res, err);
                }
                pr.tasks.push(task);
                pr.save(function (err) {
                  if (err) {
                    return apiResponse.ErrorResponse(res, err);
                  }
                  return apiResponse.successResponseWithData(
                    res,
                    'Add task success',
                    pr,
                  );
                });
              });
            } else {
              return 'khong co';
            }
          });
        }
      } catch (error) {
        return apiResponse.ErrorResponse(res, error);
      }
    },
  ];
  // editTask = [
  //   (req, res) => {
  //     try {
  //       const errors = validationResult(req);
  //       if (!errors.isEmpty()) {
  //         return apiResponse.validationErrorWithData(
  //           res,
  //           'Validation Error',
  //           errors.array(),
  //         );
  //       } else {
  //         Project.findOne({ _id: req.params.idProject }).then((pr) => {
  //           if (pr) {
  //             Task.findOneAndUpdate({_id: req.params.idTask }, {
  //               name = req.body.name,
  //               description = req.body.description
  //             }, {nw: true}).then((result) => {
  //               return apiResponse.successResponseWithData(
  //                 res,
  //                 'Add task success',
  //                 pr,
  //               );
  //             })
  //             // .catch(err) {
  //             //   return apiResponse.ErrorResponse(res, err);
  //             // }
  //           } else {
  //             return 'khong co';
  //           }
  //         });
  //       }
  //     } catch (error) {
  //       return apiResponse.ErrorResponse(res, error);
  //     }
  //   }
  // ]
}
module.exports = new TaskController();