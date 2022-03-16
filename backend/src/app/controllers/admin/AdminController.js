const User = require('../../models/User');
const Project = require('../../models/Project');
const apiResponse = require('../../../utils/apiResponse');
const endOfDay = require('date-fns/endOfDay');
const startOfDay = require('date-fns/startOfDay');
require('dotenv').config();

class AdminController {
  getAllUsers = async (req, res) => {
    const users = await User.find({
      createdAt: {
        $gte: startOfDay(
          new Date(`${new Date().getFullYear()}-01-01T00:00:00.000Z`),
        ),
        $lte: endOfDay(
          new Date(`${new Date().getFullYear() + 1}-01-01T00:00:00.000Z`),
        ),
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
    const projects = await Project.find({
      // createdAt: {
      //   $gte: startOfDay(
      //     new Date(`${new Date().getFullYear()}-01-01T00:00:00.000Z`),
      //   ),
      //   $lte: endOfDay(
      //     new Date(`${new Date().getFullYear() + 1}-01-01T00:00:00.000Z`),
      //   ),
      // },
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
