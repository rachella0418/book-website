const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    pwLength: {
        type: Number,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
    },
    haveRead: {
        type: [String],
        required: false,
    },
    currentlyReading: {
        type: [String],
        required: false,
    },
    toBeRead: {
        type: [String],
        required: false,
    }
});

module.exports = mongoose.model("user", userSchema);