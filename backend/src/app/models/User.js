const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true, minlength: 6 },
    token: { type: String },
    phoneNumber: { type: String },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', User, 'User');
