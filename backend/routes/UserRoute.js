const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer');
const path = require('path');

const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;
const userLogger = require('../logger/userLogger');
const fetchuser = require('../middleware/fetchuser');

const host = "http://localhost:5000/"

// @route   POST api/auth/signup
// @desc    Register user
// @access  Public

router.post('/signup', [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        userLogger.error({ error: errors.message, date: new Date() });
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return (res.status(400).json({ error: "Email already exists!Consider Logging in" }));
        }
        securePassword = await bcrypt.hash(req.body.password, 10)
        //create new user and save to database
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        });
        const authToken = jwt.sign({ user: user._id }, JWT_SECRET)
        success = true;
        userLogger.info({ message: "User Created" + req.body.email + req.body.name, date: new Date() });
        res.json({ success, authToken })
    } catch (error) {
        userLogger.error({ error: error.message, date: new Date() });
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// @route   POST api/auth/updateuser
// @desc    Update user
// @access  Public
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/users/');
    },
    filename: (req, file, cb) => {
        const userId = req.user; // Make sure to include the user ID in the request body
        const filename = `profile_${userId}.jpg`;
        console.log(filename);
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });
router.post('/updateuser', fetchuser, upload.single('profileImage'), async (req, res) => {
    let success = false;
    const uploadedFile = req.file;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     userLogger.error({ error: errors.message, date: new Date() });
    //     return res.status(400).json({ errors: errors.array() });
    // }
    try {
        //check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email })
        user.name = req.body.name;
        user.email = req.body.email;
        user.profileImage = host + uploadedFile.path;
        //update user and save to database
        user = await user.save();
        success = true;
        userLogger.info({ message: "User Updated" + req.body.email + req.body.name, date: new Date() });
        res.json({ success })

    } catch (error) {
        userLogger.error({ error: error.message, date: new Date() });
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user and get token
// @access  Public

router.post('/login', [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()],
    async (req, res) => {
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            userLogger.error({ error: errors.message, date: new Date() });
        }
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "You are not registered with us. Please Sign Up!" })
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                userLogger.error({ message: "Invalid credential input", date: new Date() })
                return res.status(400).json({ message: "Please enter valid credentials" })
            }
            const authToken = jwt.sign({ user: user._id }, JWT_SECRET)
            success = true;
            userLogger.info({ message: "user logged in successfully", user: user.email, date: new Date() })
            res.json({ success, authToken })
        } catch (error) {
            userLogger.error({ error: error.message, date: new Date() });
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    });

// @route   POST api/auth/getuserinfo
// @desc    Get user info using auth-token
// @access  Public

router.get('/getuserinfo', fetchuser, async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId).select("-password")
        userLogger.info({ user: user })
        res.send(user)
    } catch (error) {
        userLogger.error(error)
        res.status(500).send(error)
    }
});
router.post('/getuserinfobyid', async (req, res) => {
    try {
        const userId = req.body.id;
        const user = await User.findById(userId).select("-password")
        userLogger.info({ user: user })
        res.send(user)
    } catch (error) {
        userLogger.error(error)
        res.status(500).send(error)
    }
});

module.exports = router;