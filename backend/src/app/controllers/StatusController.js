const Status = require('../models/Status');
const { body, validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
require('dotenv').config();

class StatusController {
  createStatus = [
    body('name')
      .isLength({ min: 1 })
      .withMessage('Status name must be specified'),
    (req, res) => {
      let status = new Status();
      status.name = req.body.name;
      status.save(function (err) {
        if (err) {
          return apiResponse.ErrorResponse(res, err);
        }
        return apiResponse.successResponseWithData(
          res,
          'Add new status successfully',
        );
      });
    },
  ];
  showStatus = [
    (req, res) => {
      Status.find().then((status) => {
        if (status) {
          return apiResponse.successResponseWithData(res, 'data', status);
        } else {
          return apiResponse.ErrorResponse(res, 'Not found project');
        }
      });
    },
  ];
}

module.exports = new StatusController();