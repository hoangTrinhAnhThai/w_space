const User = require('../models/User');
const Role = require('../models/Role');
const { validationResult } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const host = require('../../utils/decodeJWT');

require('dotenv').config();

class AuthController {
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
          user.avatar = (req.body.firstName).charAt(0) + (req.body.lastName).charAt(0)
          console.log('------------------------',user.avatar);
          Role.findOne({ name: 'User' }).then((role) => {
            user.role = role
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
          })
        }
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];

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
                        user: user,
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
                    return apiResponse.unauthorizedResponse(
                      res,
                      'Password wrong',
                    );
                  }
                },
              );
            } else return apiResponse.unauthorizedResponse(res, 'Email wrong');
          });
        }
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];
  getUserInfor = [
    (req, res) => {
      User.findById(host(req, res)).then((user) => {
        return apiResponse.successResponseWithData(
          res,
          'user information',
          user,
        );
      });
    },
  ];
}

module.exports = new AuthController();
