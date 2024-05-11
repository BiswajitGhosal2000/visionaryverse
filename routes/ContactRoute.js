const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const Contact = require('../models/Contact');

// Create a contact using: POST "/api/contacts/createcontact". Doesn't require Auth
// @route   POST /api/contacts/createcontact
// @desc    Register user
// @access  User

router.post('/contactinfo', async (req, res) => {
    console.log(req.body.email)
    try {
        const existing = await Contact.findOne({ email: req.body.email });
        if (existing) {
            return res.status(400).json({ error: "You're already subscribed !" });
        }
        const contact = await Contact.create({
            email: req.body.email,
        });
        res.json({ contact });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

});

module.exports = router;