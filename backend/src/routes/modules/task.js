const express = require('express');
const router = express.Router();
const taskController = require('../../app/controllers/project/TaskController');
const checklistController = require('../../app/controllers/project/checklistController');
const fileController = require('../../app/controllers/project/FileController');
const commentController = require('../../app/controllers/project/CommentController');

const server = require('http').createServer(express);
const server_port = 8000;
require('dotenv').config();

const io = require('socket.io')(server, {
  cors: {
    origin: `${process.env.URL}`,
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
  allowEIO3: true,
});
const { taskValidation } = require('../../middleware/validation');

// router.get('/:idProject', taskController.showAllTask);
router.get('/tasksOfProject/:id/', taskController.showAllTask);
router.get('/comment/:id', commentController.getCommentByIdTask);
router.get('/checklist/:idTask', checklistController.showAllChecklistByTask);
router.get('/checklists', checklistController.showAllChecklist);
router.get('/files/:idTask', fileController.showAllFileByTask);
router.get('/:id', taskValidation(), taskController.showTask);

router.post('/checklist/:id', taskController.addChecklistTask);
router.post('/comment/:id', commentController.createComment);
router.post('/checklistItem/:id/', checklistController.createChecklistItem);
router.post('/:id/', taskValidation(), taskController.createTask);

router.put('/checklistItem/:idItem/', checklistController.editChecklistItem);
router.put('/attach/upload/:id', taskController.attachImg);
router.put('/:id', taskValidation(), taskController.editTask);
router.put('/', taskController.moveCard);

router.delete('/files/:idFile', fileController.deleteFile);
router.delete('/checklist/:idChecklist', checklistController.deleteChecklist);
router.delete(
  '/checklistItem/:idChecklistItem',
  checklistController.deleteChecklist,
);
router.delete('/:idProject/:idTask', taskController.deleteTask);

server.listen(server_port);
io.on('connection', function (socket) {
  socket.on('save-comment', function (data) {
    io.emit('new-comment', { message: data });
  });
});
// router.get('/task/:id', taskValidation(), taskController.showTask);
// router.post('/:id/task', taskValidation(), taskController.createTask);
// router.put('/task/:id', taskValidation(), taskController.editTask);

module.exports = router;
