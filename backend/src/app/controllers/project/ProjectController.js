const Project = require('../../models/Project');
const Room = require('../../models/Room');
const Notification = require('../../models/Notification');
const { validationResult } = require('express-validator');
const apiResponse = require('../../../utils/apiResponse');
const User = require('../../models/User');
const host = require('../../../utils/decodeJWT');
require('dotenv').config();

class ProjectController {
  createProject = async (req, res) => {
    const user = await host(req, res);
    if (user) {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return apiResponse.validationErrorWithData(
            res,
            'Validation Error',
            errors.array(),
          );
        }
        const { name } = req.body;
        const project = await Project.findOne({ name });
        if (project) {
          return apiResponse.ErrorResponse(res, 'Project name already in use');
        }
        const room = await Room.create({ name, createdBy: user });
        const newProject = await Project.create({
          name,
          createdBy: user,
          room: room,
          isDelete: false,
        });
        await Notification.create({
          room: room._id,
          project: newProject._id,
          listContent: {
            member: user,
            count: 0,
            unreadCount: 0,
            contents: { message: '', createdBy: null },
          },
        });
        return apiResponse.successResponseWithData(
          res,
          'Add new project successfully',
          newProject,
        );
      } catch (error) {
        return apiResponse.ErrorResponse(res, error);
      }
    }
  };

  editProject = async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;
    const project = await Project.findById(id).populate('createdBy');
    if (!project) {
      return apiResponse.ErrorResponse(res, 'No project found');
    }
    const projectUpdate = await Project.findByIdAndUpdate(id, {
      name,
      description,
    });
    const room = await Room.findByIdAndUpdate(projectUpdate.room, {
      name,
    });
    return apiResponse.successResponseWithData(
      res,
      'Edit project successfully',
      projectUpdate,
    );
  };
  addMember = async (req, res) => {
    const id = req.params.id;
    const userId = req.body.user;
    const project = await Project.findById(id).populate('createdBy');
    if (!project) {
      return apiResponse.ErrorResponse(res, 'No project found');
    }
    const user = await User.findById(userId);
    if (!user) {
      return apiResponse.ErrorResponse(req, "Coundn't add user");
    }
    let isExsitUser = false;
    if (project.members.length > 0) {
      for (let member of project.members) {
        if (JSON.stringify(member._id) === JSON.stringify(user._id)) {
          isExsitUser = true;
          break;
        }
      }
    }
    if (
      isExsitUser ||
      JSON.stringify(user._id) === JSON.stringify(project.createdBy._id)
    ) {
      return apiResponse.ErrorResponse(res, 'The member joined');
    } else {
      const room = await Room.findByIdAndUpdate(project.room._id, {
        $push: { members: user._id },
      });
      await Notification.findOneAndUpdate(
        { room: room._id },
        {
          $push: {
            listContent: {
              member: user._id,
              count: 0,
              unreadCount: 0,
              contents: { message: '', createdBy: null },
            },
          },
        },
      );
      return apiResponse.successResponseWithData(
        res,
        'Add member successfully',
        await Project.findByIdAndUpdate(
          id,
          {
            $push: { members: user._id },
          },
          { new: true },
        ).populate('members'),
      );
    }
  };

  removeMember = async (req, res) => {
    const userId = req.body.user;
    const projectId = req.params.id;
    const user = await User.findById(userId);
    if (user) {
      const project = await Project.findByIdAndUpdate(
        projectId,
        {
          $pull: { members: user._id },
        },
        { new: true },
      ).populate('members');
      const room = await Room.findByIdAndUpdate(project.room._id, {
        members: project.members,
      });
      const notifiction = await Notification.findOneAndUpdate(
        { room: project.room._id },
        {
          $pull: { listContent: { member: user._id } },
        },
      );
      return apiResponse.successResponseWithData(
        res,
        'Remove project successfully',
        project,
      );
    }
  };
  deleteProject = async (req, res) => {
    const user = await User.findById(host(req, res));
    if (user) {
      const project = await Project.findByIdAndUpdate(req.params.id, {
        isDelete: true,
      });
      const room = await Room.findByIdAndDelete(project.room);
      return apiResponse.successResponse(res, 'Delete project successfully');
    }
  };

  showAllProjects = async (req, res) => {
    const user = await User.findById(host(req, res));
    const project = await Project.find({
      $and: [
        { $or: [{ createdBy: user }, { members: user }], isDelete: false },
      ],
    })
      .sort({ createdAt: -1 })
      .populate('tasks')
      .populate('members')
      .populate('createdBy');
    if (!project) {
      return apiResponse.ErrorResponse(res, 'Not found project');
    }
    return apiResponse.successResponseWithData(res, 'data', project);
  };
  showProject = async (req, res) => {
    const project = await Project.findById(req.params.id)
      .populate('tasks')
      .populate('members')
      .populate('createdBy')
      .populate('status');
    if (!project) {
      return apiResponse.ErrorResponse(res, error);
    }
    return apiResponse.successResponseWithData(
      res,
      'Get tasks success',
      project,
    );
  };
}

module.exports = new ProjectController();
