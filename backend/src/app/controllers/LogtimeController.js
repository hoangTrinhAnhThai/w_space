const Task = require('../models/Task');
const LogTime = require('../models/Logtime')
const { validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
const Logtime = require('../models/Logtime');
require('dotenv').config();

class LogtimeController {
  showLogtime = [
    (req, res) => {
      LogTime.findById(req.params.id)
        .then((logtime) => {
          return apiResponse.successResponseWithData(
            res,
            'show task success',
            logtime,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ]
  showAllLogtime = [
    (req, res) => {
      LogTime.find().sort({ 'createdAt': -1 })
        .then((logtimes) => {
          return apiResponse.successResponseWithData(
            res,
            'show task success',
            logtimes
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ]
  createLogtime = [
    (req, res) => {
      console.log(req.body);
      const logtime = new Logtime()
      logtime.startTime = req.body.startTime
      logtime.task = req.body.idTask
      logtime.note = req.body.note
      logtime.isPlaying = req.body.isPlaying
      LogTime.create(logtime).then((logtime) => {
        Task.findByIdAndUpdate(
          req.body.idTask,
          { $push: { logtimes: logtime } },
          { new: true, useFindAndModify: false },
        ).then((result) => {
          console.log('result', result);
          return apiResponse.successResponseWithData(
            res,
            'Add logtime success',
            result,
          );
        })
      })
    }
  ]
  updateLogtime = [
    (req, res) => {
      console.log(req.body);
      LogTime.findByIdAndUpdate(
        req.params.id,
        {
          task: req.body.task,
          note: req.body.note,
          stopTime: req.body.stopTime,
          startTime:  req.body.startTime,
          isPlaying: req.body.isPlaying,
          timeInMiliseconds: req.body.timeInMiliseconds

        },
        { new: true, useFindAndModify: false },
      ).then((result) => {
        console.log('result', result);
        return apiResponse.successResponseWithData(
          res,
          'Update logtime success',
          result,
        );
      })
    }
  ]
  deleteLogtime = [
    (req, res) => {
      Logtime.findByIdAndDelete(req.params.id).then(() => {
        return apiResponse.successResponse(res, 'Delete project successfully');
      });
    },
  ]
}

module.exports = new LogtimeController();
