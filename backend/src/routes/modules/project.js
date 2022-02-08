const express = require('express');
const router = express.Router();
const projectController = require('../../app/controllers/project/ProjectController');

const {
  projectValidation,
} = require('../../middleware/validation');


// project
router.get('/:id', projectController.showProject);
router.get('/', projectController.showAllProjects);
router.post('/', projectValidation(), projectController.createProject);
router.put('/:id', projectController.editProject);
router.delete('/:id', projectController.deleteProject);
router.put('/:id/member/remove', projectController.removeMember);
router.put('/:id/member/add', projectController.addMember);

module.exports = router;
