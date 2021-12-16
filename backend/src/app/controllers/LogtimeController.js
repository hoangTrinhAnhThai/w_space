const LogTime = require('../models/Logtime');
const User = require('../models/User');
const apiResponse = require('../../utils/apiResponse');
const Logtime = require('../models/Logtime');
const endOfDay = require('date-fns/endOfDay');
const startOfDay = require('date-fns/startOfDay');
const host = require('../../utils/decodeJWT');

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
  ];
  showAllLogtime = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        LogTime.find({ createdBy: user })
          .sort({ createdAt: -1 })
          .then((logtimes) => {
            return apiResponse.successResponseWithData(
              res,
              'show logtimes success',
              logtimes,
            );
          })
          .catch((error) => {
            return apiResponse.ErrorResponse(res, 'error');
          });
      })
    },
  ];
  showAllLogtimeByDate = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        LogTime.find(
          {
            $and: [{ createdBy: user }, {
              createdAt: {
                $gte: startOfDay(new Date(req.params.date)),
                $lte: endOfDay(new Date(req.params.date)),
              }
            }]
          })
          .sort({ createdAt: -1 })
          .then((logtimes) => {
            return apiResponse.successResponseWithData(
              res,
              'show tasks success',
              logtimes,
            );
          })
          .catch((error) => {
            return apiResponse.ErrorResponse(res, error);
          });
      })
    },
  ];
  showAllLogtimeByTask = [
    (req, res) => {
      LogTime.find({
        task: req.params.task,
      })
        .then((logtimes) => {
          return apiResponse.successResponseWithData(
            res,
            req.params.task,
            logtimes,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ];
  createLogtime = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        let logtime = new Logtime();
        logtime.startTime = req.body.startTime;
        logtime.task = req.body.task;
        logtime.note = req.body.note;
        logtime.isPlaying = req.body.isPlaying;
        logtime.createdBy = user
        LogTime.create(logtime ).then((logtime) => {
          return apiResponse.successResponseWithData(
            res,
            'Add logtime success',
            logtime,
          );
        }).catch((error) => {
          return apiResponse.ErrorResponse(res, error)
        })
      })
    },
  ];
  updateLogtime = [
    (req, res) => {
      LogTime.findByIdAndUpdate(
        req.params.id,
        {
          task: req.body.task,
          note: req.body.note,
          stopTime: req.body.stopTime,
          startTime: req.body.startTime,
          isPlaying: req.body.isPlaying,
          timeInMiliseconds: req.body.timeInMiliseconds,
        },
        { new: true, useFindAndModify: false },
      ).then((result) => {
        return apiResponse.successResponseWithData(
          res,
          'Update logtime success',
          result,
        );
      });
    },
  ];
  deleteLogtime = [
    (req, res) => {
      Logtime.findByIdAndDelete(req.params.id).then(() => {
        return apiResponse.successResponse(res, 'Delete project successfully');
      });
    },
  ];
}

module.exports = new LogtimeController();
