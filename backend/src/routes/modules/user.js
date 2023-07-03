const express = require('express');
const router = express.Router();
const userController = require('../../app/controllers/user/UserController');
const { emailValidation } = require('../../middleware/validation');

router.post('/', emailValidation(), userController.searchByEmail);
router.get('/:id', emailValidation(), userController.getUser);
router.put('/:id', userController.editUser);

module.exports = router;
