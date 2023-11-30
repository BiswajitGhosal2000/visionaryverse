const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: new Date()
    }
});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;