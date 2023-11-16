const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    }
});
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;