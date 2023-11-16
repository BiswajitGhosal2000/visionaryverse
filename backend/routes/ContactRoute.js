const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator')
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

const Contact = require('../models/Contact');

// Create a contact using: POST "/api/contacts/createcontact". Doesn't require Auth
// @route   POST /api/contacts/createcontact
// @desc    Register user
// @access  User

router.post('/contactinfo', [
    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail()
], async (req, res) => {
    console.log(req.body.name)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error(errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, message } = req.body;
    try {
        const contact = await Contact.create({
            name: name,
            email: email,
            message: message,
        });
        res.json({ contact });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

});

module.exports = router;