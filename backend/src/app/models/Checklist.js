const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Checklist = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
    name: { type: String },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ChecklistItem',
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Checklist', Checklist, 'Checklist');
