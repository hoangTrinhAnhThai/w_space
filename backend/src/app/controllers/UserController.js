const User = require('../models/User');
const Role = require('../models/Role');
const { validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {
  searchByEmail = [
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
          User.findOne({ email: req.body.email }).then((user) => {
            if (user) {
              return apiResponse.successResponseWithData(
                res,
                'Get User successfully',
                user,
              );
            } else {
              apiResponse.ErrorResponse(res, 'Not found user');
            }
          });
        }
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];
}

module.exports = new UserController();
