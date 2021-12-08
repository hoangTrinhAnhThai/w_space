const express = require('express');
const router = express.Router();
const projectController = require('../../app/controllers/ProjectController');
const taskController = require('../../app/controllers/TaskController');
const commentController = require('../../app/controllers/CommentController');
const server = require('http').createServer(express);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
  allowEIO3: true,
});
const {
  projectValidation,
  taskValidation,
} = require('../../middleware/validation');

// task
router.get('/tasks/', taskValidation(), taskController.showAllTask);
router.get('/task/:id', taskValidation(), taskController.showTask);
router.post('/:id/task', taskValidation(), taskController.createTask);
router.put('/task/:id', taskValidation(), taskController.editTask);
router.delete('/:idProject/:idTask', taskController.deleteTask);
router.post('/task', taskController.moveCard);

router.post('/task/:id/comment', commentController.createComment);
router.get('/task/:id/comment', commentController.getCommentByIdTask);

// project
router.get('/:id', projectController.showProject);
router.get('/', projectController.showAllProjects);
router.post('/', projectValidation(), projectController.createProject);
router.put('/:id', projectController.editProject);
router.delete('/:id', projectController.deleteProject);
router.put('/:id/member/remove', projectController.removeMember);
router.put('/:id/member/add', projectController.addMember);
server.listen(5000);
io.on('connection', function (socket) {
  socket.on('save-comment', function (data) {
    io.emit('new-comment', { message: data });
  });
});
module.exports = router;
