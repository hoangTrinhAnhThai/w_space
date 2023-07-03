const User = require('../../models/User');
const { validationResult } = require('express-validator');
const apiResponse = require('../../../utils/apiResponse');
require('dotenv').config();

class UserController {
  searchByEmail = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error',
          errors.array(),
        );
      } else {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
          apiResponse.ErrorResponse(res, 'Not found user');
        }
        return apiResponse.successResponseWithData(
          res,
          'Get User successfully',
          user,
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  };
  getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      apiResponse.ErrorResponse(res, 'Not found user');
    }
    return apiResponse.successResponseWithData(
      res,
      'Get User successfully',
      user,
    );
  };
  editUser = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error',
          errors.array(),
        );
      } else {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
          apiResponse.ErrorResponse(res, 'Not found user');
        }
        return apiResponse.successResponseWithData(
          res,
          'Edit User successfully',
          user,
        );
      }
    } catch (err) {
      return apiResponse.ErrorResponse(res, err);
    }
  };
}

module.exports = new UserController();
