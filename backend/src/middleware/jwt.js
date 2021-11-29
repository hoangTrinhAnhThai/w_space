
const jwt = require('express-jwt')
const secret = process.env.TOKEN_SECREATE

const authenticated = jwt({
  secret: secret,
  algorithms: ['HS256']
})

module.exports = authenticated