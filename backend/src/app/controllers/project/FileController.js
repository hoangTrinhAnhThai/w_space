const File = require('../../models/File');
const { validationResult } = require('express-validator');
const apiResponse = require('../../../utils/apiResponse');
require('dotenv').config();

class FileController {
  showAllFile = async (req, res) => {
    const file = await File.find().sort({ status: -1 });
    if (!file) {
      return apiResponse.ErrorResponse(res, error);
    }
    return apiResponse.successResponseWithData(res, 'show file success', file);
  };
  showAllFileByTask = async (req, res) => {
    const file = await File.find({ task: req.params.idTask }).sort({
      status: -1,
    });
    if (!file) {
      return apiResponse.ErrorResponse(res, error);
    }
    return apiResponse.successResponseWithData(res, 'show file success', file);
  };
  showFile = async (req, res) => {
    const file = await File.findById(req.params.id);
    if (!file) {
      return apiResponse.ErrorResponse(res, error);
    }
    return apiResponse.successResponseWithData(res, 'show file success', file);
  };

  deleteFile = async (req, res) => {
    await File.findByIdAndDelete(req.params.idFile);
    return apiResponse.successResponse(res, 'Delete file successfully');
  };
}
module.exports = new FileController();
