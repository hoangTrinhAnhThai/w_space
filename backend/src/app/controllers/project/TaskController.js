const Task = require('../../models/Task');
const Project = require('../../models/Project');
const Status = require('../../models/Status');
const Logtime = require('../../models/Logtime');
const { validationResult } = require('express-validator');
const apiResponse = require('../../../utils/apiResponse');
require('dotenv').config();
const { addANode, dropANode } = require('../../../utils/movedCard');

class TaskController {
  showAllTask = async (req, res) => {
    const tasks = Task.find().populate('comments').populate('assigned');
    if (!tasks) {
      return apiResponse.ErrorResponse(res, error);
    }
    return apiResponse.successResponseWithData(res, 'show task success', tasks);
  };
  showTask = async (req, res) => {
    const task = Task.findById(req.params.id)
      .populate('comments')
      .populate('assigned').populate('status');
    if (!task) {
      return apiResponse.ErrorResponse(res, error);
    }
    return apiResponse.successResponseWithData(res, 'show task success', task);
  };

  createTask = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error',
          errors.array(),
        );
      } else {
        const status = await Status.findOne({ name: 'Open' });
        let taskParams = new Task();
        taskParams.name = req.body.name;
        taskParams.description = req.body.description;
        taskParams.status = status;
        taskParams.dueDate = req.body.dueDate;
        taskParams.priority = req.body.priority;
        taskParams.moved.before = null;
        taskParams.checklist = []
        const docTask = await Task.create(taskParams);
        const project = await Project.findById(req.params.id).populate('tasks');
        if (!project) {
          return apiResponse.ErrorResponse(res, 'Not found project');
        }
        if (project.tasks.length > 0) {
          for (let task of project.tasks) {
            if (
              JSON.stringify(task.status) == JSON.stringify(status._id) &&
              task.moved.before == null
            ) {
              await Task.findByIdAndUpdate(task._id, {
                'moved.before': docTask._id,
              });
              await Task.findByIdAndUpdate(docTask._id, {
                'moved.after': task._id,
              });
              await Project.findByIdAndUpdate(
                req.params.id,
                { $push: { tasks: docTask._id } },
                { new: true, useFindAndModify: false },
              );
              return apiResponse.successResponse(res, 'Add task success');
              break;
            }
          }
        } else {
          await Task.findByIdAndUpdate(docTask._id, {
            'moved.after': null,
          });
          await Project.findByIdAndUpdate(
            req.params.id,
            { $push: { tasks: docTask._id } },
            { new: true, useFindAndModify: false },
          );
          return apiResponse.successResponse(res, 'Add task success');
        }
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error);
    }
  };

  editTask = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error',
          errors.array(),
        );
      } else {
        const taskUpdate = await Task.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true },
        );
        return apiResponse.successResponseWithData(
          res,
          'Edit task successfully',
          taskUpdate,
        );
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error);
    }
  };
  addChecklistTask = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error',
          errors.array(),
        );
      } else {
        const taskUpdate = await Task.findByIdAndUpdate(
          req.params.id,
          {$push: { checklist: {name: req.body.name, items: []} }},
          { new: true },
        );
        return apiResponse.successResponseWithData(
          res,
          'Edit task successfully',
          taskUpdate,
        );
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error);
    }
  };
  addChecklistItemTask = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error',
          errors.array(),
        );
      } else {
        const taskUpdate = await Task.findByIdAndUpdate(
          req.params.id,
          {$push: { checklist: {name: req.body.name, items: []} }},
          { new: true },
        );
        return apiResponse.successResponseWithData(
          res,
          'Edit task successfully',
          taskUpdate,
        );
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error);
    }
  };
  deleteTask = async (req, res) => {
    const idProject = req.params.idProject;
    const idTask = req.params.idTask;
    const project = await Project.findById(idProject).populate('tasks');
    if (!project) {
      return apiResponse.ErrorResponse(res, 'Cannot find project');
    }
    dropANode(project.tasks, idTask);
    const logtimes = await Logtime.find({ task: idTask });
    if (logtimes.length > 0) {
      for (let logtime of logtimes) {
        await Logtime.findByIdAndDelete(logtime._id);
      }
    }
    await Task.findByIdAndDelete(idTask);
    return apiResponse.successResponse(res, 'Delete task successfully');
  };
  moveCard = async (req, res) => {
    const status = await Status.findById(req.body.statusId);
    const task = await Task.findByIdAndUpdate(req.body.id, {
      'moved.before': req.body.moved.before,
      'moved.after': req.body.moved.after,
      status: status,
    });
    const project = await Project.findById(req.body.idProject).populate(
      'tasks',
    );
    if (!project) {
      return apiResponse.ErrorResponse(res, 'Cannot find project');
    }
    if (project.tasks.length > 1) {
      dropANode(project.tasks, req.body.id);
      addANode(
        project.tasks,
        req.body.id,
        req.body.moved.before,
        req.body.moved.after,
      );
    }
  };
}
module.exports = new TaskController();
