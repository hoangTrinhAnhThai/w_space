const Project = require('../models/Project');
const Room = require('../models/Room');
const Notification = require('../models/Notification');
const { validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
const User = require('../models/User');
const host = require('../../utils/decodeJWT');
require('dotenv').config();

class ProjectController {
  createProject = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return apiResponse.validationErrorWithData(
              res,
              'Validation Error',
              errors.array(),
            );
          } else {
            Project.findOne({ name: req.body.name }).then((project) => {
              if (project) {
                return apiResponse.ErrorResponse(
                  res,
                  'Project name already in use',
                );
              } else {
                let newProject = new Project();
                newProject.name = req.body.name;
                newProject.description = req.body.description;
                newProject.createdBy = user;
                Room.create({ name: req.body.name, createdBy: user }).then(
                  (room) => {
                    newProject.room = room;
                    Project.create(newProject)
                      .then((project) => {
                        Notification.create({
                          room: room._id,
                          project: project._id,
                          listContent: {
                            member: user,
                            count: 0,
                            unreadCount: 0,
                            contents: { message: '', createdBy: null },
                          },
                        }).then((result) => {
                          return apiResponse.successResponseWithData(
                            res,
                            'Add new project successfully',
                            project,
                          );
                        });
                      })
                      .catch((err) => {
                        return apiResponse.ErrorResponse(res, err);
                      });
                  },
                );
              }
            });
          }
        } catch (error) {
          return apiResponse.ErrorResponse(res, error);
        }
      });
    },
  ];
  editProject = [
    (req, res) => {
      Project.findById(req.params.id)
        .populate('createdBy')
        .then((project) => {
          if (project) {
            Project.findByIdAndUpdate(
              req.params.id,
              {
                name: req.body.name,
                description: req.body.description,
              },
              { new: true },
            ).then((project) => {
              Room.findByIdAndUpdate(project.room, {
                name: req.body.name,
              }).then((room) => {
                return apiResponse.successResponseWithData(
                  res,
                  'Edit project successfully',
                  project,
                );
              });
            });
          }
        });
    },
  ];
  addMember = [
    (req, res) => {
      Project.findById(req.params.id)
        .populate('createdBy')
        .then((project) => {
          if (project) {
            User.findById(req.body.user).then((user) => {
              if (user) {
                let isExsitUser = false;
                if (project.members.length > 0) {
                  for (let member of project.members) {
                    if (
                      JSON.stringify(member._id) === JSON.stringify(user._id)
                    ) {
                      isExsitUser = true;
                      break;
                    }
                  }
                }
                if (
                  isExsitUser ||
                  JSON.stringify(user._id) ===
                    JSON.stringify(project.createdBy._id)
                ) {
                  return apiResponse.ErrorResponse(res, 'The member joined');
                } else {
                  Project.findByIdAndUpdate(
                    req.params.id,
                    {
                      $push: { members: user._id },
                    },
                    { new: true },
                  )
                    .populate('members')
                    .then((project) => {
                      Room.findByIdAndUpdate(project.room._id, {
                        members: project.members,
                      }).then(() => {
                        Notification.findOneAndUpdate(
                          { room: project.room._id },
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
                        ).then((result) => {
                          return apiResponse.successResponseWithData(
                            res,
                            'Edit project successfully',
                            project,
                          );
                        });
                      });
                    })
                    .catch((error) => {
                      return apiResponse.ErrorResponse(res, error);
                    });
                }
              }
            });
          }
        });
    },
  ];
  removeMember = [
    (req, res) => {
      User.findById(req.body.user).then((user) => {
        if (user) {
          Project.findByIdAndUpdate(
            req.params.id,
            {
              $pull: { members: user._id },
            },
            { new: true },
          )
            .populate('members')
            .then((project) => {
              Room.findByIdAndUpdate(project.room._id, {
                members: project.members,
              }).then(() => {
                Notification.findOneAndUpdate(
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
              });
            })
            .catch((error) => {
              return apiResponse.ErrorResponse(res, error);
            });
        }
      });
    },
  ];
  deleteProject = [
    (req, res) => {
      Project.findByIdAndDelete(req.params.id).then((project) => {
        Room.findByIdAndDelete(project.room).then((result) => {
          return apiResponse.successResponse(
            res,
            'Delete project successfully',
          );
        });
      });
    },
  ];

  showAllProjects = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        Project.find({ $or: [{ createdBy: user }, { members: user }] })
          .sort({ createdAt: -1 })
          .populate('tasks')
          .populate('members')
          .populate('createdBy')
          .then((project) => {
            if (project) {
              return apiResponse.successResponseWithData(res, 'data', project);
            } else {
              return apiResponse.ErrorResponse(res, 'Not found project');
            }
          });
      });
    },
  ];
  showProject = [
    (req, res) => {
      Project.findById(req.params.id)
        .populate('tasks')
        .populate('members')
        .populate('createdBy')
        .then((project) => {
          return apiResponse.successResponseWithData(
            res,
            'Get tasks success',
            project,
          );
        })
        .catch((error) => {
          return apiResponse.ErrorResponse(res, error);
        });
    },
  ];
}

module.exports = new ProjectController();
