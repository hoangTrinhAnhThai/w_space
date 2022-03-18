const express = require('express');
const router = express.Router();
const adminController = require('../../app/controllers/admin/AdminController');

router.get('/users', adminController.getAllUsersList);
router.get('/projects', adminController.getAllProjectsList);
router.post('/users', adminController.getAllUsers);
router.post('/projects', adminController.getAllProjects);
module.exports = router;
