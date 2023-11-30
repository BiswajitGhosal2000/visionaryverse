const multer = require('multer'); // Assuming you have a Blog model

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/blogs/');
    },
    filename: async (req, file, cb) => {
        const filename = `blog_${req.body.title}_${req.user}.jpg`;
        cb(null, filename);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
