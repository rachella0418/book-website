const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    bookid: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: false,
    },
    library: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model("rating", ratingSchema);