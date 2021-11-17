const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Logtime = new Schema(
    {
        time: { type: String, maxlength: 255 },
        task: {
            type: Schema.Types.ObjectId,
            ref: 'Task',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Logtime', Logtime, 'Logtime');
