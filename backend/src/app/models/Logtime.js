const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Logtime = new Schema(
    {
        startTime: { type: Date, maxlength: 255 },
        stopTime: { type: Date, maxlength: 255 },
        task: {
            type:  Schema.Types.ObjectId,
            ref: 'Task',
        },
        note: {
            type: String
        },
        isPlaying: {
            type: Boolean
        },
        timeInMiliseconds: {
            type: String
        }
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Logtime', Logtime, 'Logtime');
