const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema(
  {
    name: { type: String, maxlength: 255 },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Room', Room, 'Room');
