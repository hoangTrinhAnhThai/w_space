const express = require('express');
const router = express.Router();
const userController = require('../../app/controllers/UserController');
const { emailValidation } = require('../../middle-ware/validation');

router.post('/', emailValidation(), userController.searchByEmail);

module.exports = router;
