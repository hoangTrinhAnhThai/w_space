const Project = require('../models/Project');
const { validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
require('dotenv').config();

class ProjectController {
  createProject = [
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
          let newProject = new Project();
          newProject.name = req.body.name;
          newProject.description = req.body.description;

          newProject.save(function (err) {
            if (err) {
              return apiResponse.ErrorResponse(res, 'err');
            }
            return apiResponse.successResponseWithData(
              res,
              'Add new project successfully',
              newProject,
            );
          });
        }
      } catch (error) {
        return apiResponse.ErrorResponse(res, error);
      }
    },
  ];
  editProject = [
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
          Project.findByIdAndUpdate(req.params.id,
            {
              name: req.body.name,
              description: req.body.description
            }, { new: true }).then((result) => {
              return apiResponse.successResponseWithData(
                res,
                'Edit project successfully',
                result,
              );
            }).catch((error) => {
              return apiResponse.ErrorResponse(res, error);
            })
        }
      } catch (error) {
        return apiResponse.ErrorResponse(res, error);
      }
    },
  ]
  deleteProject = [
    (req, res) => {
      Project.findByIdAndDelete(req.params.id).then(() => {
        return apiResponse.successResponse(res, 'Delete project successfully')
      })
    }
  ]

  showAllProjects = [
    (req, res) => {
      Project.find().populate('tasks').then((project) => {
        if (project) {
          return apiResponse.successResponseWithData(res, 'data', project);
        } else {
          return apiResponse.ErrorResponse(res, 'Not found project');
        }
      });
    },
  ];
  showProject = [
    (req, res) => {
      Project.findById(req.params.id)
        .populate('tasks')
        .then((project) => {
          return apiResponse.successResponseWithData(
            res,
            'Get tasks success',
            project,
          );
        }).catch((error) => {
          return apiResponse.ErrorResponse(res, error)
        })
    },
  ];
}

module.exports = new ProjectController();