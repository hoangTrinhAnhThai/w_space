const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notification = new Schema(
  {
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    listContent: [
      {
        member: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        count: {
          type: Number,
        },
        unreadCount: {
          type: Number,
        },
        contents: [
          {
            message: {
              type: String,
            },
            createdBy: {
              type: Schema.Types.ObjectId,
              ref: 'User',
            },
          },
        ],
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

module.exports = mongoose.model('Notification', Notification, 'Notification');
