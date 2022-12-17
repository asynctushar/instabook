const app = require('./app.js');
const databaseConnect = require('../config/db.js');

const port = process.env.PORT;

//Handling Uncaught Exceptions
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Uncaught Exceptions.`);

    process.exit(1)
})

// connect database
databaseConnect();

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