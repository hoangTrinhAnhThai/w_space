const Project = require('../models/Project');
const Room = require('../models/Room');
const { validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
const User = require('../models/User');
const host = require('../../utils/decodeJWT')
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
            let newProject = new Project();
            newProject.name = req.body.name;
            newProject.description = req.body.description;
            newProject.createdBy = user
            newProject.save(function (err) {
              if (err) {
                return apiResponse.ErrorResponse(res, 'err');
              } else {
                Room.create({ name: req.body.name }).then(() => {
                  return apiResponse.successResponseWithData(
                    res,
                    'Add new project successfully',
                    newProject,
                  );
                })
              }

            });
          }
        } catch (error) {
          return apiResponse.ErrorResponse(res, error);
        }
      })

    },
  ];
  editProject = [
    (req, res) => {
      User.findById(req.body.user).then((user) => {
        if (user) {
          Project.findById(req.params.id).then((project) => {
            if (project) {
              let isExsitUser = false;
              if (project.members.length > 0) {
                for (let member of project.members) {
                  if (JSON.stringify(member._id) === JSON.stringify(user._id)) {
                    isExsitUser = true;
                    break;
                  }
                }
              }
              console.log('joined', isExsitUser);
              if (isExsitUser) {
                return apiResponse.ErrorResponse(res, 'The member joined');
              } else {
                Project.findByIdAndUpdate(
                  req.params.id,
                  {
                    name: req.body.name,
                    description: req.body.description,
                    $push: { members: user._id },
                  },
                  { new: true },
                )
                  .populate('members')
                  .then((result) => {
                    return apiResponse.successResponseWithData(
                      res,
                      'Edit project successfully',
                      result,
                    );
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
            .then((result) => {
              return apiResponse.successResponseWithData(
                res,
                'Remove member successfully',
                result,
              );
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
      Project.findByIdAndDelete(req.params.id).then(() => {
        return apiResponse.successResponse(res, 'Delete project successfully');
      });
    },
  ];

  showAllProjects = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        Project.find({ $or: [
          {createdBy: user}, 
          {members: user}
        ] })
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
      })
    }
  ];
  showProject = [
    (req, res) => {
      Project.findById(req.params.id)
        .populate('tasks')
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
