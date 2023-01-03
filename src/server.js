const app = require('./app.js');
const databaseConnect = require('../config/db.js');
const cloudinary = require('cloudinary').v2;

const port = process.env.PORT;

// Handling Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exceptions.`);

    process.exit(1)
})

// connect database
databaseConnect();

// cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(port, () => {
    console.log(`Server started at port:${port}`);
})

//Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection.`);

    server.close(() => {
        process.exit(1)
    })
})

// socket.io intregation for realtime chat

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
    },
    pingTimeout: 60000
})

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
}

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
}

io.on('connection', (socket) => {
    // when connect
    console.log("connected");

    // take socketId and userId from users
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
    })

    // send and get message
    socket.on("sendMessage", ({ senderId, description, recieverId }) => {
        const user = getUser(recieverId);

        io.to(user?.socketId).emit("getMessage", {
            senderId,
            description
        })
    })

    // when disconnect
    socket.once("disconnect", (reason) => {
        removeUser(socket.id);
    })
})
