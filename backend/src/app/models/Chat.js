const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
    message: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    isFile: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Chat', Chat, 'Chat');
