const Project = require('../models/Project');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
require('dotenv').config();
const auth = require('../../middle-ware/jwt');

class ProjectController {
  createProject = [
    body('name')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Project name must be specified'),
    body('description')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Project description must be specified'),
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
  showAllProjects = [
    (req, res) => {
      Project.find().then((project) => {
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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error',
          errors.array(),
        );
      } else {
        Project.findOne({ _id: req.params.id }).then((project) => {
          if (project) {
            return apiResponse.successResponseWithData(res, 'data', project);
          } else {
            return apiResponse.ErrorResponse(res, 'Not found project');
          }
        });
      }
    },
  ];
}

module.exports = new ProjectController();