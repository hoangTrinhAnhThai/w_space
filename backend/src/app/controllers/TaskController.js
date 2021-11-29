const Task = require('../models/Task');
const Project = require('../models/Project');
const Status = require('../models/Status');
const Logtime = require('../models/Logtime');
const { validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
require('dotenv').config();
const { addANode, dropANode } = require('../../utils/movedCard');

class TaskController {
  showAllTask = [
    (req, res) => {
      Task.find()
        .then((task) => {
          console.log(task);
          return apiResponse.successResponseWithData(
            res,
            'show task success',
            task,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ];
  showTask = [
    (req, res) => {
      Task.findById(req.params.id)
        .then((task) => {
          return apiResponse.successResponseWithData(
            res,
            'show task success',
            task,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ];
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
              task.dueDate = req.body.dueDate;
              task.priority = req.body.priority;
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
              dueDate: req.body.dueDate,
              priority: req.body.priority,
              $push: { members: req.body.userId },
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
              dueDate: req.body.dueDate,
              priority: req.body.priority,
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
      Project.findById(req.params.idProject)
        .populate('tasks')
        .then((project) => {
          if (project) {
              dropANode(project.tasks, req.params.idTask);
              Logtime.find({ task: req.params.idTask }).then((logtimes) => {
                console.log(logtimes);
                if(logtimes.length > 0) {
                  for (let logtime of logtimes) {
                    Logtime.findByIdAndDelete(logtime._id).then(() => {
                      return;
                    });
                  }
                }
                Task.findByIdAndDelete(req.params.idTask).then(() => {
                  console.log('xoa ok');
                  return apiResponse.successResponse(res, 'Delete Success');
                });
              });
          }
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
                if (project.tasks.length > 1) {
                  dropANode(project.tasks, req.body.id);
                  addANode(
                    project.tasks,
                    req.body.id,
                    req.body.moved.before,
                    req.body.moved.after,
                  );
                }
              }
            });
        });
      });
    },
  ];
}
module.exports = new TaskController();
