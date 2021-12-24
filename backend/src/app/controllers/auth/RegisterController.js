const User = require('../../models/User');
const Role = require('../../models/Role');
const { validationResult } = require('express-validator');
const apiResponse = require('../../../utils/apiResponse');
const bcrypt = require('bcrypt');

require('dotenv').config();

class SignupController {
  register = [
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return apiResponse.validationErrorWithData(
            res,
            'Validation Error',
            errors.array(),
          );
        } else {
          const salt = await bcrypt.genSalt(10);
          let user = new User();
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.email = req.body.email;
          user.password = await bcrypt.hash(req.body.password, salt);
          user.avatar =
            req.body.firstName.charAt(0) + req.body.lastName.charAt(0);
          Role.findOne({ name: 'User' }).then((role) => {
            user.role = role;
            user.save(function (err) {
              if (err) {
                return apiResponse.ErrorResponse(res, err);
              }
              return apiResponse.successResponseWithData(
                res,
                'register success',
                user,
              );
            });
          });
        }
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];
}

module.exports = new SignupController();
