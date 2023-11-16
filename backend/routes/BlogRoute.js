const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

const Blog = require('../models/Blog');
const blogLogger = require('../logger/blogLogger');
const fetchuser = require('../middleware/fetchuser');


// Create a blog using: POST "/api/blogs/createblog". Require Auth
// @route   POST /api/blogs/createblog
// @desc    Register user
// @access  User

router.post('/createblog', fetchuser,
    [body('title', 'Please enter a title').isLength({ min: 5 }),
    body('content', 'please provide some content').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            blogLogger.error(errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, content, tag, } = req.body;
        try {
            const blog = await Blog.create({
                title: title,
                content: content,
                tag: tag,
                user: req.user
            });
            res.json({ blog });
            blogLogger.info({ message: "Blog created successfully", title: blog.title, user: req.user });
        } catch (error) {
            blogLogger.error(error, req.user.id);
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

router.put('/updateblog/:id', fetchuser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        blogLogger.error(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, content, tag, } = req.body;
    try {
        const newBlog = {};
        if (title) { newBlog.title = title };
        if (content) { newBlog.content = content };
        if (tag) { newBlog.tag = tag };
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
        const blogs = await Blog.find({ user: req.user });
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
        ]);

        res.json({ blogs });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching blogs.' });
    }
});

module.exports = router;