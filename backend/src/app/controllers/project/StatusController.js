const Status = require('../../models/Status');
const { body, validationResult } = require('express-validator');
const apiResponse = require('../../../utils/apiResponse');
require('dotenv').config();

class StatusController {
  createStatus = [
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
    async (req, res) => {
      const status = await Status.find();
      if (!status) {
        return apiResponse.ErrorResponse(res, 'Not found status');
      }
      return apiResponse.successResponseWithData(res, 'status', status);
    },
  ];
  deleteStatus = [
    (req, res) => {
      Status.findByIdAndDelete(req.params.id).then(() => {
        return apiResponse.successResponse(res, 'Delete task successfully');
      });
    },
  ];
}

module.exports = new StatusController();
