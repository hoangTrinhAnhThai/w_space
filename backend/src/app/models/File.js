const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const File = new mongoose.Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
    name: {
      type: String,
    },
    isFile: {
      type: Boolean,
    },
    url: {
      type: String
    },
    contentType: { type: String }
  },
  {
    timestamps: true,
  });

module.exports = mongoose.model('File', File, 'File');
