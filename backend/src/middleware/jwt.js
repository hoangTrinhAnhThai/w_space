const jwt = require('express-jwt');
const secret = process.env.TOKEN_SECRET;

const authenticated = jwt({
  secret: secret,
  algorithms: ['HS256'],
});

module.exports = authenticated;
