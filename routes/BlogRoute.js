const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
require('dotenv').config();

const Blog = require('../models/Blog');
const blogLogger = require('../logger/blogLogger');
const fetchuser = require('../middleware/fetchuser');
const upload = require('../middleware/uploadphoto');

const host = process.env.HOST;

// Create a blog using: POST "/api/blogs/createblog". Require Auth
// @route   POST /api/blogs/createblog
// @desc    Register user
// @access  User

router.post('/createblog', fetchuser,
    upload.single('contentImg'),
    async (req, res) => {
        const uploadedFile = req.file;
        // console.log(req.body.content);
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     blogLogger.error(errors.array());
        //     return res.status(400).json({ errors: errors.array() });
        // }
        try {
            const blog = await Blog.create({
                _id: req._id,
                title: req.body.title,
                content: req.body.content,
                tag: req.body.tag,
                user: req.user,
                contentImg: host + uploadedFile.path
            });
            res.json({ blog });
            blogLogger.info({ message: "Blog created successfully", title: blog.title, user: req.user });
        } catch (error) {
            blogLogger.error(error.message, req.user.id);
            res.status(500).send("Internal Server Error");
        }

    });

// View a blog using: GET "/api/blogs/viewblog/:id". Doesn't require Auth
// @route   GET /api/blogs/viewblog/:id
// @desc    Get user blogs
// @access  Public

router.get('/viewblog/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        console.log(blog)
        if (!blog) {
            return res.status(404).send("Not Found");
        }
        res.json({ blog });
    } catch (error) {
        blogLogger.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Update a blog using: PUT "/api/blogs/updateblog/:id". require Auth
// @route   PUT /api/blogs/updateblog/:id
// @desc    Update user blogs
// @access  User

router.put('/updateblog/:id', fetchuser, upload.single('contentImg'), async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     blogLogger.error(errors.array());
    //     return res.status(400).json({ errors: errors.array() });
    // } 
    const uploadedFile = req.file;
    try {
        const newBlog = {};
        if (req.body.title !== undefined) { newBlog.title = req.body.title };
        if (req.body.content !== undefined) { newBlog.content = req.body.content };
        if (req.body.tag !== undefined) { newBlog.tag = req.body.tag };
        if (req.body.date !== undefined) { newBlog.date = req.body.date };
        if (uploadedFile) { newBlog.contentImg = host + uploadedFile.path };
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send("Not Found");
        }
        if (blog.user.toString() !== req.user) {
            return res.status(401).send("Not Allowed");
        }
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: newBlog },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).send("Blog not found");
        }

        res.json({ blog: updatedBlog });
        blogLogger.info({ message: "Blog updated successfully", title: updatedBlog.title, user: req.user });
    } catch (error) {
        blogLogger.error({ message: error.message, User: req.user.id });
        res.status(500).send("Internal Server Error");
    }
});

router.put('/addcomment/:id', fetchuser, async (req, res) => {
    const userId = req.user;
    const commentText = req.body.comment;

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId) || !commentText) {
        return res.status(400).json({ error: "Invalid user ID or missing comment text" });
    }
    const comment = {
        user: new mongoose.Types.ObjectId(userId),
        comment: commentText,
        date: Date.now()
    };

    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        // Ensure that the 'comments' array is initialized if it doesn't exist
        if (!blog.comments) {
            blog.comments = [];
        }

        blog.comments.unshift(comment);
        await blog.save();

        res.json({ blog });
    } catch (error) {
        // Handle other errors
        blogLogger.error(error.message, req.user);
        res.status(500).send("Internal Server Error");
    }

});

// Get all blogs using: GET "/api/blogs/getuserblogs". require Auth
// @route   GET /api/blogs/getuserblogs
// @desc    Get user blogs
// @access  User

router.get('/getuserblogs', fetchuser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        blogLogger.error(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        // console.log(first)
        const blogs = await Blog.find({ user: req.user }).sort({ date: -1 });
        res.json({ blogs: blogs });
    } catch (error) {
        blogLogger.error(error, req.user.id);
        res.status(500).send("Internal Server Error");
    }
}
);

// Get all blogs using: GET "/api/blogs/getallblogs". Doesn't require Auth
// @route   GET /api/blogs/getallblogs
// @desc    Get all blogs
// @access  Public

router.get('/getallblogs', async (req, res) => {
    try {
        const page = parseInt(req.query.page); // Current page, default is 1
        const limit = parseInt(req.query.limit); // Number of blogs per page, default is 10

        const skip = (page - 1) * limit;

        const blogs = await Blog.aggregate([
            {
                $lookup: {
                    from: 'users', // Replace with the actual name of the users collection
                    localField: 'user', // Assuming 'user' is the field in your Blog collection
                    foreignField: '_id',
                    as: 'author'
                }
            },
            {
                $unwind: '$user'
            }
        ])
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);
        const totalBlogs = await Blog.countDocuments();

        res.json({ blogs, currentPage: page, totalPages: Math.ceil(blogs.length / limit), totalResults: totalBlogs });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching blogs.' + error });
    }
});


module.exports = router;