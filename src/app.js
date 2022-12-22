const express = require('express');
const cookieParser = require('cookie-parser');
const bb = require('express-busboy');
const path = require('path');

// environment setup before routes
if (process.env.NODE_ENV != "PRODUCTION") {
    require('dotenv').config({ path: 'config/config.env' });
}

// Route Import 
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json({ limit: "60mb" }));
app.use(express.urlencoded({ extended: true, limit: "60mb" }));
bb.extend(app, {
    upload: true,
    mimeTypeLimit : [
        'text/x-markdown',
        'application/javascript',
        'image/jpeg',
        'image/png'
    ]
});
app.use(cookieParser());

app.use('/api/v1', userRoutes);
app.use('/api/v1', postRoutes);
app.use('/api/v1', commentRoutes);

// middleware for errors
app.use(errorMiddleware);

module.exports = app;