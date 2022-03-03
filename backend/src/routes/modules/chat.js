const express = require('express');
const server = require('http').createServer(express);
const server_port = 7000;
require('dotenv').config();
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const url = process.env.MONGODB_URI;
const crypto = require('crypto');
const router = express.Router();
const chatController = require('../../app/controllers/chatroom/ChatController');
const Chat = require('../../app/models/Chat');
const File = require('../../app/models/File');
const Task = require('../../app/models/Task');
const Notification = require('../../app/models/Notification');
const User = require('../../app/models/User');
const apiResponse = require('../../utils/apiResponse');
const host = require('../../utils/decodeJWT');

const conn = mongoose.createConnection(url);

let gfs;
let filename, name;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        filename = file.originalname;
        // let name = buf.toString('hex') + path.extname(file.originalname);
        name = `${filename}-${buf.toString('hex')}`;
        const fileInfo = {
          filename: name,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });

const io = require('socket.io')(server, {
  cors: {
    origin: `${process.env.URL}`,
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
  allowEIO3: true,
});

router.post('/attach/upload/:id', upload.single('file'), async (req, res) => {
  const file = await gfs.files.findOne({ filename: name });
  console.log(file);
  const taskUpdate = await Task.findById(req.params.id);
  const newFile = await File.create({
    name: file.filename,
    isFile: true,
    task: taskUpdate,
    contentType: file.contentType,
  });
  const task = await Task.findByIdAndUpdate(req.params.id, {
    $push: { files: newFile },
  });
  return apiResponse.successResponseWithData(
    res,
    'Add file successfully',
    task,
  );
});
router.post('/upload/:id', upload.single('file'), async (req, res) => {
  const file = await gfs.files.findOne({ filename: name });
  const user = await User.findById(host(req, res));
  let chatParams = new Chat();
  chatParams.createdBy = user;
  chatParams.isFile = true;
  chatParams.message = file.filename;
  chatParams.room = req.params.id;
  const chat = await Chat.create(chatParams);
  const notification = await Notification.findOne({ room: req.params.id });
  let listContent = notification.listContent;
  for (let content of listContent) {
    if (JSON.stringify(user._id) != JSON.stringify(content.member._id)) {
      content.count += 1;
      content.unreadCount += 1;
      content.contents.push({
        message: chat.message,
        createdBy: chat.createdBy,
      });
    }
  }
  await Notification.findByIdAndUpdate(notification._id, {
    listContent: listContent,
  });
  return apiResponse.successResponseWithData(
    res,
    'Create chat successfully',
    chat,
  );
});
router.get('/upload/', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0)
      return res.status(404).json({ err: 'No files exist' });
    return res.json(files);
  });
});

router.post('/download/:name', (req, res) => {
  gfs.files.findOne(
    {
      filename: req.params.name,
    },
    function (err, file) {
      if (err) {
        return res.status(400).send(err);
      } else if (!file) {
        return res
          .status(404)
          .send('Error on the database looking for the file.');
      }
      res.set('Content-Type', 'text/json');
      // res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
      var readstream = gfs.createReadStream({
        filename: req.params.name,
      });
      const chunks = [];
      readstream.on('data', function (chunk) {
        chunks.push(chunk);
      });

      readstream.on('end', function () {
        res.send({
          name: file.filename,
          type: file.contentType,
          data: Buffer.concat(chunks).toString('base64'),
        });
      });
    },
  );
});

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
