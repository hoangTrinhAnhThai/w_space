const express = require('express');
const router = express.Router();
const authController = require('../../app/controllers/AuthController');
const {
  loginValidation,
  registerValidation,
} = require('../../middleware/validation');

router.post('/login', loginValidation(), authController.login);
router.post('/register', registerValidation(), authController.register);

module.exports = router;
