const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Chat = new Schema(
    {
        room: {
            type: Schema.Types.ObjectId,
            ref: 'Task',
        },
        nickName: {
            type: String
        },
        message: {
            type: String
        }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Chat', Chat, 'Chat');
