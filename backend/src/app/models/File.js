const mongoose = require('mongoose');

const File = new mongoose.Schema({
    doc_id: {
        type: String
    },
    length : {
        type: Number
    },
    name: {
        type: String
    },
    type: {
        type: String
    }
});

module.exports = mongoose.model('File', File);