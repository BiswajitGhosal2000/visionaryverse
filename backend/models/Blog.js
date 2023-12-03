const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = Schema({
    _id: {
        type: String,
        default: function () {
            return new mongoose.Types.ObjectId(); // Generate a new ObjectId by default
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User', // Assuming your user model is named 'User'
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: new Date()
            }
        }
    ],
    contentImg: {
        type: String,
        required: false,
        default: "https://clickfirstmarketing.com/wp-content/uploads/Purpose-of-Blogging.jpeg"
    },
    date: {
        type: Date,
        default: new Date()
    }
}, { _id: false });
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;