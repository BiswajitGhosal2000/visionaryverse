const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String,
    },
    date: {
        type: String,
        default: new Date()
    }
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;