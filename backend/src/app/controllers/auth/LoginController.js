const User = require('../../models/User');
const Role = require('../../models/Role');
const { validationResult } = require('express-validator');
const apiResponse = require('../../../utils/apiResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const host = require('../../../utils/decodeJWT');

require('dotenv').config();

class LoginController {
  login = [
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
          await User.findOne({ email: req.body.email }).then((user) => {
            if (user) {
              bcrypt.compare(
                req.body.password,
                user.password,
                (error, isValid) => {
                  if (isValid) {
                    const tokenCreated = jwt.sign(
                      {
                        _id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                      },
                      process.env.TOKEN_SECRET,
                      { expiresIn: process.env.JWT_TIMEOUT_DURATION },
                    );
                    let userData = {
                      _id: user._id,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email,
                      token: tokenCreated,
                      password: user.password,
                    };
                    User.findByIdAndUpdate(
                      user._id,
                      userData,
                      {},
                      function (err) {
                        if (err) {
                          return apiResponse.ErrorResponse(res, err);
                        } else {
                          return apiResponse.successResponseWithData(
                            res,
                            'Login success',
                            userData,
                          );
                        }
                      },
                    );
                  } else {
                    return apiResponse.ErrorResponse(res, 'Password wrong');
                  }
                },
              );
            } else return apiResponse.ErrorResponse(res, 'Email wrong');
          });
        }
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];
}

module.exports = new LoginController();
