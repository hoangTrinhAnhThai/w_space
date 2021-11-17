const Task = require('../models/Task');
const Project = require('../models/Project');
const Status = require('../models/Status');
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
          Status.findOne({ name: 'Open' })
            .then((status) => {
              let task = new Task();
              task.name = req.body.name;
              task.description = req.body.description;
              task.status = status;
              task.moved.before = null;
              Task.create(task).then((docTask) => {
                Project.findById(req.params.id)
                  .populate('tasks')
                  .then((project) => {
                    if (project) {
                      if (project.tasks.length > 0) {
                        for (let task of project.tasks) {
                          if (
                            JSON.stringify(task.status) ==
                            JSON.stringify(status._id) &&
                            task.moved.before == null
                          ) {
                            Task.findByIdAndUpdate(task._id, {
                              'moved.before': docTask._id,
                            }).then(() => {
                              Task.findByIdAndUpdate(docTask._id, {
                                'moved.after': task._id,
                              }).then(() => {
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
                              });
                            });
                            break;
                          }
                        }
                      } else {
                        Task.findByIdAndUpdate(docTask._id, {
                          'moved.after': null,
                        }).then((result) => {
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
                        });
                      }
                    } else {
                      return apiResponse.ErrorResponse(
                        res,
                        'Not found project',
                      );
                    }
                  });
              });
            })
            .catch((error) => {
              return apiResponse.ErrorResponse(res, error);
            });
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
          Task.findByIdAndUpdate(
            req.params.id,
            {
              name: req.body.name,
              description: req.body.description,
            },
            { new: true },
          )
            .then((result) => {
              return apiResponse.successResponseWithData(
                res,
                'Edit task successfully',
                result,
              );
            })
            .catch((error) => {
              return apiResponse.ErrorResponse(res, error);
            });
        }
      } catch (error) {
        return apiResponse.ErrorResponse(res, error);
      }
    },
  ];
  deleteTask = [
    (req, res) => {
      Task.findByIdAndDelete(req.params.id).then(() => {
        return apiResponse.successResponse(res, 'Delete task successfully');
      });
    },
  ];
  moveCard = [
    async (req, res) => {
      Status.findById(req.body.statusId).then((status) => {
        Task.findByIdAndUpdate(req.body.id, {
          'moved.before': req.body.moved.before,
          'moved.after': req.body.moved.after,
          status: status,
        }).then(() => {
          Project.findById(req.body.idProject)
            .populate('tasks')
            .then((project) => {
              if (project) {
                let taskBeforeNew = null;
                let taskAfterNew = null;
                if (project.tasks.length > 1) {
                  for (let task of project.tasks) {
                    if (task.moved.before == req.body.id) {
                      taskAfterNew = task;
                    }
                    if (task.moved.after == req.body.id) {
                      taskBeforeNew = task;
                    }

                    if (req.body.moved.before && JSON.stringify(task._id) == JSON.stringify(req.body.moved.before)) {
                      Task.findByIdAndUpdate(task._id, { 'moved.after': req.body.id }).then((result) => {
                        return result
                      })
                    }
                    if (req.body.moved.after && JSON.stringify(task._id) == JSON.stringify(req.body.moved.after)) {
                      Task.findByIdAndUpdate(task._id, { 'moved.before': req.body.id }).then((result) => {
                        return result
                      })
                    }
                  }
                  if (taskBeforeNew) {
                    if (taskAfterNew) {
                       Task.findByIdAndUpdate(taskBeforeNew._id, {
                        'moved.after': taskAfterNew._id,
                      }).then((result) => {
                        return result
                      })
                    } else {
                       Task.findByIdAndUpdate(taskBeforeNew._id, {
                        'moved.after': null,
                      }).then((result) => {
                        return result
                      })
                    }
                  }
                  if (taskAfterNew) {
                    if (taskBeforeNew) {
                      Task.findByIdAndUpdate(taskAfterNew._id, {
                        'moved.before': taskBeforeNew._id,
                      }).then((result) => {
                        return result
                      })
                    } else {
                      Task.findByIdAndUpdate(taskAfterNew._id, {
                        'moved.before': null,
                      }).then((result) => {
                        return result
                      })
                    }
                  }
                }
              }
            });
        });
      });
    },
  ];
}
module.exports = new TaskController();
