const express = require('express');
const server = require('http').createServer(express);
const server_port = 4000;
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
const router = express.Router();
const chatController = require('../../app/controllers/ChatController');

router.get('/', chatController.getAllChats);
router.get('/:id', chatController.getSingleChatByRoomId);
router.post('/', chatController.createChat);
router.put('/:id', chatController.updateChat);
router.delete('/:id', chatController.deleteChat);

server.listen(server_port);

io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function () {
    console.log('User disconnected');
  });
  socket.on('save-message', function (data) {
    io.emit('new-message', { message: data });
  });
});
module.exports = router;
