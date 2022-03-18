const LogTime = require('../../models/Logtime');
const User = require('../../models/User');
const apiResponse = require('../../../utils/apiResponse');
const Logtime = require('../../models/Logtime');
const endOfDay = require('date-fns/endOfDay');
const startOfDay = require('date-fns/startOfDay');
const host = require('../../../utils/decodeJWT');
require('dotenv').config();

class LogtimeController {
  showLogtime = async (req, res) => {
    const logtime = await LogTime.findById(req.params.id);
    if (!logtime) {
      return apiResponse.ErrorResponse(res, 'Not found logtime');
    }
    return apiResponse.successResponseWithData(
      res,
      'show task success',
      logtime,
    );
  };
  showAllLogtime = async (req, res) => {
    const user = await User.findById(host(req, res));
    const logtimes = await LogTime.find({ createdBy: user }).populate('task').sort({
      createdAt: -1,
    });
    return apiResponse.successResponseWithData(
      res,
      'show logtimes success',
      logtimes,
    );
  };

  showAllLogtimeByDate = async (req, res) => {
    const user = await User.findById(host(req, res));
    let logtimes =[] 
    const params = req.params.date
    if (params != 'undefined') {
       logtimes = await LogTime.find({
        $and: [
          { createdBy: user },
          {
            createdAt: {
              $gte: startOfDay(new Date(req.params.date)),
              $lte: endOfDay(new Date(req.params.date)),
            },
          },
        ],
      }).populate('createdBy').populate('task').sort({ createdAt: -1 });
    } else {
      logtimes = await LogTime.find().populate('createdBy').populate('task').sort({ createdAt: -1 });
    }
    return apiResponse.successResponseWithData(
      res,
      'Show logtimes success',
      logtimes,
    );
  };
  showAllLogtimeByTask = async (req, res) => {
    const logtimes = await LogTime.find({
      task: req.params.task,
    }).populate('createdBy').populate('task');
    return apiResponse.successResponseWithData(
      res,
      'Show logtime successfully',
      logtimes,
    );
  };
  createLogtime = async (req, res) => {
    const user = await User.findById(host(req, res));
    let logtimeParams = new Logtime();
    logtimeParams.startTime = req.body.startTime;
    logtimeParams.task = req.body.task;
    logtimeParams.note = req.body.note;
    logtimeParams.isPlaying = req.body.isPlaying;
    logtimeParams.createdBy = user;
    const logtime = await LogTime.create(logtimeParams);
    return apiResponse.successResponseWithData(
      res,
      'Add logtime success',
      logtime,
    );
  };
  updateLogtime = async (req, res) => {
    const logtime = await LogTime.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    return apiResponse.successResponseWithData(
      res,
      'Update logtime success',
      logtime,
    );
  };
  deleteLogtime = async (req, res) => {
    await Logtime.findByIdAndDelete(req.params.id);
    return apiResponse.successResponse(res, 'Delete project successfully');
  };
}

module.exports = new LogtimeController();
