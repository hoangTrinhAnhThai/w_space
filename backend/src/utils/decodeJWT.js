const jwt = require('jsonwebtoken');
const apiResponse = require('../utils/apiResponse');

const host = function (req, res) {
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(' ')[1],
      user;
    try {
      user = jwt.verify(authorization, process.env.TOKEN_SECRET);
    } catch (e) {
      return apiResponse.unauthorizedResponse(res, 'Unauthorized');
    }
  } else {
    return apiResponse.unauthorizedResponse(res, 'Unauthorized');
  }
  return user;
};

module.exports = host;
