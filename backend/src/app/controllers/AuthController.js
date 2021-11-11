const User = require('../models/User');
const Role = require('../models/Role');
const { body, validationResult, check } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const apiResponse = require('../../utils/apiResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthController {
  register = [
    body('fullName')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Fullname must be specified'),
    body('email')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Email is specified')
      .isEmail()
      .withMessage('Email must be a valid email adrress')
      .custom((value) => {
        return User.findOne({ email: value }).then((user) => {
          if (user) {
            return Promise.reject('Email already in use');
          }
        });
      }),
    body('password')
      .isLength({ min: 6 })
      .trim()
      .withMessage('Password must be 6 characters or greater'),
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
          const tokenCreated = jwt.sign(
            {
              email: req.body.email,
            },
            process.env.TOKEN_SECREATE,
            { expiresIn: process.env.JWT_TIMEOUT_DURATION },
          );
          let user = new User();
          user.fullName = req.body.fullName;
          user.email = req.body.email;
          user.password = await bcrypt.hash(req.body.password, salt);
          user.token = tokenCreated;
          user.role = {
            _id: '6188e2e979934adb9699ba5a',
            name: 'User',
          };
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
        }
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];

  login = [
    body('email')
      .isLength({ min: 1 })
      .trim()
      .withMessage('Email must be specified')
      .isEmail()
      .withMessage('Email must be a valid email adrress'),
    body('password')
      .isLength({ min: 6 })
      .trim()
      .withMessage('Password must be specified'),
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
              const validPassword = bcrypt.compare(
                req.body.password,
                user.password,
                (error, isValid) => {
                  if (isValid) {
                    const tokenCreated = jwt.sign(
                      {
                        _id: user._id,
                        email: req.body.email,
                      },
                      process.env.TOKEN_SECREATE,
                      { expiresIn: process.env.JWT_TIMEOUT_DURATION },
                    );
                    let userData = {
                      _id: user._id,
                      fullName: user.fullName,
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
}

module.exports = new AuthController();