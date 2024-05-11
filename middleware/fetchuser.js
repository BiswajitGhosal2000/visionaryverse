const jwt = require('jsonwebtoken');
const { error } = require('winston');
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send(error)
    }
    try {
        const data = jwt.verify(token, jwtSecret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(400).send({ message: error })
    }
}

module.exports = fetchuser;