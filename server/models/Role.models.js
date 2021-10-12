const mongoose = require('mongoose');

const schema = mongoose.Schema({
    value: {
        type: String,
        unique: true,
        default: 'USER'
    }
});

module.exports = mongoose.model('Role', schema);