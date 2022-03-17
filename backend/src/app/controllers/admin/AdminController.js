const User = require('../../models/User');
const Project = require('../../models/Project');
const apiResponse = require('../../../utils/apiResponse');
const endOfDay = require('date-fns/endOfDay');
const startOfDay = require('date-fns/startOfDay');
const endOfYear = require('date-fns/endOfYear');
const startOfYear = require('date-fns/startOfYear');
require('dotenv').config();

class AdminController {
  getAllUsers = async (req, res) => {
    const year = new Date(String(req.body.year));
    const users = await User.find({
      createdAt: {
        $gte: startOfYear(year),
        $lte: endOfYear(year),
      },
    })
      .sort({ createdAt: 1 })
      .populate('role');
    return apiResponse.successResponseWithData(
      res,
      'Get all users successfully',
      users,
    );
  };
  getAllProjects = async (req, res) => {
    const year = new Date(String(req.body.year));
    const projects = await Project.find({
      createdAt: {
        $gte: startOfYear(year),
        $lte: endOfYear(year),
      },
      isDelete: false
    }).populate('tasks')
    .populate('members')
    .populate('createdBy')
    .populate('status')
    .populate('background').sort({ createdAt: 1 });
    return apiResponse.successResponseWithData(
      res,
      'Get all projects successfully',
      projects,
    );
  };
}
module.exports = new AdminController();
