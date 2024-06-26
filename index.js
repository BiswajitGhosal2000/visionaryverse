const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db');

const PORT = process.env.NODE_PORT;

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', express.static("./frontend/build"));

app.use("/api/auth", require("./routes/UserRoute"));
app.use("/api/blogs", require("./routes/BlogRoute"));
app.use("/api/contact", require("./routes/ContactRoute"));

app.use('/uploads', express.static('uploads'));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});