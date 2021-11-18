const jwt = require('jsonwebtoken');
const User = require('../app/models/User');
const apiResponse = require('../utils/apiResponse');

exports.auth = function (req, res) {
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(' ')[1],
      decoded;
    try {
      decoded = jwt.verify(authorization, process.env.TOKEN_SECREATE);
    } catch (e) {
      return apiResponse.unauthorizedResponse(res, 'Unauthorized');
    }
    var userEmail = decoded.email;
    User.findOne({ email: userEmail }).then(function (user) {
      return apiResponse.successResponseWithData(res, 'user', user);
    });
  }
  return res.send(500);
};
