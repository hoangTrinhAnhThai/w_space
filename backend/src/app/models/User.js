const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    fullName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true, minlength: 6 },
    token: { type: String },
    phoneNumber: {type: String},
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', User, 'User');