const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// environment setup before routes
if (process.env.NODE_ENV != "PRODUCTION") {
    require('dotenv').config({ path: 'config/config.env' });
}

// Route Import 
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json({ limit: "60mb" }));
app.use(express.urlencoded({ extended: true, limit: "60mb" }));
app.use(cookieParser());

app.use('/api/v1', userRoutes);

// middleware for errors
app.use(errorMiddleware);

module.exports = app;