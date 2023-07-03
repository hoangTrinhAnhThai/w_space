const mongoose = require('mongoose');
require('dotenv').config();
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const url = process.env.MONGODB_URI;

async function connect() {
  try {
    await mongoose.connect(`${url}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect database successfully!!!!');
  } catch (error) {
    console.log(error);
  }
}

async function upload() {
  const conn = await mongoose.createConnection(url);
  let gfs;
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
          const filename =
            buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          };
          resolve(fileInfo);
        });
      });
    },
  });
  return multer({ storage });
}

module.exports = {
  connect,
  upload,
};
