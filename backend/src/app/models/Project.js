const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Project = new Schema(
  {
    name: { type: String, maxLength: 255 },
    description: { type: String, maxLength: 600 },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Task',
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Project', Project, 'Project');
