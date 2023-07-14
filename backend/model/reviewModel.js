const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    book: {
        type: Number,
        required: true,
    },
    upvotes: {
        type: Number,
        required: false,
    },
    replies: {
        type: [String],
        required: false,
    }
});

module.exports = mongoose.model("review", reviewSchema);