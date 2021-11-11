const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Status = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Status', Status, 'Status');