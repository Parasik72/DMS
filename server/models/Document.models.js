const mongoose = require('mongoose');

const schema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    uploadedBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    fileName: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Document', schema);