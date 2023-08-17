const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        required: false,
    },
    replies: {
        type: [String],
        required: false,
    },
    replyTo: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("review", reviewSchema);