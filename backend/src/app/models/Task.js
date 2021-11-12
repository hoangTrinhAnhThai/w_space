const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema(
  {
    name: { type: String, maxlength: 255 },
    description: { type: String, maxlength: 600 },
    moved: {
      before: { type: String },
      after: { type: String },
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: 'Status',
    },
    moved: {
      before: { type: String},
      after: { type: String}
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Task', Task, 'Task');
