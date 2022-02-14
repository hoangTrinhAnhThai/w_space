const mongoose = require('mongoose');

const Background = new mongoose.Schema({
  url: {
    type: String,
  },
  title: {
    type: String,
  },
});

module.exports = mongoose.model('Background', Background);
