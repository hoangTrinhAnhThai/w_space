const Task = require('../models/Task');
const Project = require('../models/Project');
const Status = require('../models/Status')
const { body, validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
require('dotenv').config();

class TaskController {
  createTask = [
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
          Status.findById('6188e159b6fc472025217718').then((status) => {
            let task = new Task();
            task.name = req.body.name;
            task.description = req.body.description;
            task.status = status
            task.moved.before = null
            Task.create(task).then((docTask) => {
              Project.findById(req.params.id).populate('tasks').then((project) => {
                if (project) {
                  let firstTask;
                  if (project.tasks.length > 0) {
                    for (let task of project.tasks) {
                      if (task.status == '6188e159b6fc472025217718' && task.moved.before == null) {
                        firstTask = task;
                        break;
                      }
                    }
                    Task.findByIdAndUpdate(firstTask._id, { 'moved.before': docTask._id }).then(() => {
                      Task.findByIdAndUpdate(docTask._id, { 'moved.after': firstTask._id }).then(() => {
                        Project.findByIdAndUpdate(
                          req.params.id,
                          { $push: { tasks: docTask._id } },
                          { new: true, useFindAndModify: false },
                        ).then((result) => {
                          return apiResponse.successResponseWithData(
                            res,
                            'Add task success',
                            result,
                          );
                        });
                      })
                    })
                  } else {
                    Task.findByIdAndUpdate(docTask._id, { 'moved.after': null }).then((result) => {
                      Project.findByIdAndUpdate(
                        req.params.id,
                        { $push: { tasks: docTask._id } },
                        { new: true, useFindAndModify: false },
                      ).then((result) => {
                        return apiResponse.successResponseWithData(
                          res,
                          'Add task success',
                          result,
                        );
                      });
                    })
                  }

                } else {
                  return apiResponse.ErrorResponse(res, 'Not found project');
                }
              })

            });
          }).catch((error) => {
            return apiResponse.ErrorResponse(res, error);
          })
        }
      } catch (error) {
        return apiResponse.ErrorResponse(res, error);
      }
    },
  ];
  editTask = [
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
          Task.findByIdAndUpdate(req.params.id,
            {
              name: req.body.name,
              description: req.body.description
            }, { new: true }).then((result) => {
              return apiResponse.successResponseWithData(
                res,
                'Edit task successfully',
                result,
              );
            }).catch((error) => {
              return apiResponse.ErrorResponse(res, error);
            })
        }
      } catch (error) {
        return apiResponse.ErrorResponse(res, error);
      }
    },
  ];
  deleteTask = [
    (req, res) => {
      Task.findByIdAndDelete(req.params.id).then(() => {
        return apiResponse.successResponse(res, 'Delete task successfully')
      })
    }
  ]
  moveCard = [
    (req, res) => {
      Status.findById(req.body.statusId).then((status) => {
        console.log(req.body.moved.before);
        Task.findByIdAndUpdate(req.body.id, { 'moved.before': req.body.moved.before, 'moved.after': req.body.moved.after, status: status }).then(() => {
          Project.findById(req.body.idProject).populate('tasks').then((project) => {
            if (project) {
              let taskBefore = null
              let taskAfter = null
              if (project.tasks.length > 1) {
                for (let task of project.tasks) {
                  if (task.moved.before == req.body.id) {
                    taskAfter = task
                  }
                  if (task.moved.after == req.body.id) {
                    taskBefore = task
                  }
                }
                console.log('before',taskBefore);
                console.log('after', taskAfter);
                if (taskBefore) {
                  if (taskAfter) {
                    Task.findByIdAndUpdate(taskBefore._id, { 'moved.after': JSON.stringify(taskAfter._id) })
                    console.log('doi sang ', JSON.stringify(taskAfter._id));
                  } else {
                    Task.findByIdAndUpdate(taskBefore._id, { 'moved.after': null })
                  }
                }
                if (taskAfter) {
                  if (taskBefore) {
                    Task.findByIdAndUpdate(taskAfter._id, { 'moved.before': JSON.stringify(taskBefore._id) })
                    console.log('doi sang ', JSON.stringify(taskBefore._id));

                  } else {
                    Task.findByIdAndUpdate(taskAfter._id, { 'moved.before': null })
                  }
                }
              }
            }
          })
        })

      })
    }
  ]
}
module.exports = new TaskController();
