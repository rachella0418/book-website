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
    books: {
        type: [String],
        required: false,
    }
});

module.exports = mongoose.model("user", userSchema);