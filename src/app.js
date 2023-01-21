const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

// environment setup before routes
if (process.env.NODE_ENV != "PRODUCTION") {
    require('dotenv').config({ path: 'config/config.env' });
}

// Route Import 
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const chatRoutes = require('./routes/chatRoutes');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json({ limit: "60mb" }));
app.use(express.urlencoded({ extended: true, limit: "60mb" }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "PRODUCTION") {
    app.use(require('cors')({
        origin: "*",
        optionsSuccessStatus: 200
    }))
}

app.use('/api/v1', userRoutes);
app.use('/api/v1', postRoutes);
app.use('/api/v1', commentRoutes);
app.use('/api/v1', chatRoutes);

app.use(express.static(path.join(__dirname + "./../frontend/build")));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./../frontend/build/index.html"));
})

// middleware for errors
app.use(errorMiddleware);

module.exports = app;