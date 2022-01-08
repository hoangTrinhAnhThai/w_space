const express = require('express');
const server = require('http').createServer(express);
const server_port = 4000;
// const {upload} = require('../../config/database')
require('dotenv').config();
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const url = process.env.MONGODB_URI;
const crypto = require('crypto');
const path = require('path');


const conn = mongoose.createConnection(url);
let gfs;
let fileOriginalName
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: url,
  file: (req, file) => {
    fileOriginalName = file.originalname
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) return reject(err);
        filename = file.originalname;
        // let name = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
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
const router = express.Router();
const chatController = require('../../app/controllers/chatroom/ChatController');

router.post('/upload', upload.single('file'), (req, res) => {
  console.log(fileOriginalName);
  gfs.files.findOne({ filename: fileOriginalName }, (err, file) => {
    if (!file || file.length === 0) return res.status(404).json({ err: 'No file exists' });
    return res.json(file);
  });
})
router.get('/upload/', (req, res) => {
  gfs.files.findOne({ _id: '61d71836e24b380afd0d9e8c', root: 'uploads' }, (err, file) => {
    console.log(file);
    if (!file || file.length === 0) return res.status(404).json({ err: 'No file exists' });
    return res.json(file);
  });
  // gfs.files.findOne({ filename: 'SHAREVIEW_KeHoachTrienKhai_DATN.pdf' }, (err, file) => {
  //   console.log(file);
  //   if (!file || file.length === 0) return res.status(404).json({ err: 'No file exists' });
  //   return res.json(file);
  // });
  // gfs.files.find().toArray((err, files) => {
  //   if (!files || files.length === 0) return res.status(404).json({ err: 'No files exist' });
  //   return res.json(files);
  // });
})

router.post('/download/:name', (req, res) => {
  console.log(req.params.name);
  gfs.files.findOne({
    filename: req.params.name
  }, function (err, file) {
    if (err) {
      return res.status(400).send(err);
    }
    else if (!file) {
      return res.status(404).send('Error on the database looking for the file.');
    }

    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');
console.log('ok');
    var readstream = gfs.createReadStream({
      filename: req.params.name
    });

    readstream.on("error", function (err) {
      res.end();
    });
    readstream.pipe(res);
  });
})


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
