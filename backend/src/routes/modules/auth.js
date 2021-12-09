const express = require('express');
const router = express.Router();
const authController = require('../../app/controllers/AuthController');
const auth = require('../../middleware/jwt');

const {
  loginValidation,
  registerValidation,
} = require('../../middleware/validation');

router.post('/login', loginValidation(), authController.login);
router.post('/register', registerValidation(), authController.register);
router.get('/', auth, authController.getUserInfor);
module.exports = router;
