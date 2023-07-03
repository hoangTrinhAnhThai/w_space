const express = require('express');
const router = express.Router();
const loginController = require('../../app/controllers/auth/LoginController');
const signupController = require('../../app/controllers/auth/RegisterController');

const {
  loginValidation,
  registerValidation,
} = require('../../middleware/validation');

router.post('/login', loginValidation(), loginController.login);
router.post('/register', registerValidation(), signupController.register);
module.exports = router;
