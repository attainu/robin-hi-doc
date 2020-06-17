const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        max:255,
        min: 6
    },

    email: {
        type: String,
        required: true,
        max:255,
        min: 6
    },

    password: {
        type: String,
        required: true,
        max:1024,
        min:6
    },

    Profile_createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', UserSchema);