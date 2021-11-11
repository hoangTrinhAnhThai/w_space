const mongoose = require('mongoose');
require('dotenv').config();
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

module.exports = {
  connect,
};