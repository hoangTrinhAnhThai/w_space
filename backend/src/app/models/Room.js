const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Room = new Schema(
  {
    name: { type: String, maxlength: 255 },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Room', Room, 'Room');
