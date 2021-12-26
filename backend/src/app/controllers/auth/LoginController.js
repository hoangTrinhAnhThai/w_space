const User = require('../../models/User');
const { validationResult } = require('express-validator');
const apiResponse = require('../../../utils/apiResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

class LoginController {
  login = [
    async (req, res) => {
      const { email, password } = req.body
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return apiResponse.validationErrorWithData(
            res,
            'Validation Error',
            errors.array(),
          );
        }
        const user = await User.findOne({ email })
        if (!user) {
          return apiResponse.ErrorResponse(res, 'Email wrong');
        }
        bcrypt.compare(
          password,
          user.password,
          (error, isValid) => {
            if (!isValid) {
              return apiResponse.ErrorResponse(res, 'Password wrong');
            }
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
            User.findByIdAndUpdate(user._id, { token: tokenCreated }).then(() => {
              return apiResponse.successResponseWithData(
                res,
                'Login success',
                tokenCreated,
              )
            })
          },
        );
      } catch (err) {
        return apiResponse.ErrorResponse(res, err);
      }
    },
  ];
}

module.exports = new LoginController();
