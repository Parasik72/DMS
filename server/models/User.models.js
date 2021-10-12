const mongoose = require('mongoose');

const schema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    studentIDSeries: {
        type: String,
        required: true,
        unique: true
    },
    faculty: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: [{
        type: String,
        ref: 'Role'
    }]
});

module.exports = mongoose.model('User', schema);