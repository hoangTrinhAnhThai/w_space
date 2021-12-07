const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notification = new Schema(
  {
    content: {
        type:String
    },
    count: {
        total: {type: Number},
        unread: {type: Number}
    },    
    type: {
        type: String
    },
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
