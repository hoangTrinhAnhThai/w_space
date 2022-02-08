const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChecklistItem = new Schema(
    {
        checklist: {
            type: Schema.Types.ObjectId,
            ref: 'Checklist',
        },
        name: { type: String },
        isDone: { type: Boolean },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('ChecklistItem', ChecklistItem, 'ChecklistItem');
