const jwt = require('jsonwebtoken');
const apiResponse = require('../utils/apiResponse');

const host = function (req, res) {
  var authorization = req.headers.authorization.split(' ')[1],
    decoded;
  try {
    decoded = jwt.verify(authorization, process.env.TOKEN_SECRET);
  } catch (e) {
    return apiResponse.unauthorizedResponse(res, 'Unauthorized');
  }
  return decoded._id;
};

module.exports = host;
