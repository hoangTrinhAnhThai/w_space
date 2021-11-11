const mongoose = require('mongoose');
require('dotenv').config();
const url = process.env.MONGO_URL;

async function connect() {
  try {
    await mongoose.connect(`${url}/w-space`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect database successfully!!!!');
  } catch (error) {
    console.log(url);

    console.log('fail');
  }
}

module.exports = {
  connect,
};