const express = require('express');
const router = express.Router();
const adminController = require('../../app/controllers/admin/AdminController');

router.post('/users', adminController.getAllUsers);
router.post('/projects', adminController.getAllProjects);

module.exports = router;
