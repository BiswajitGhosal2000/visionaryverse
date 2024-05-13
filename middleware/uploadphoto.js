const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'https://visionaryverse.onrender.com/uploads/blogs/');
    },
    filename: (req, file, cb) => {
        const id = uuidv4(); // Generate a random unique identifier
        const filename = `${req.user}_blog_${id}.jpg`;

        // Add the generated id to the request object
        req._id = id;

        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
