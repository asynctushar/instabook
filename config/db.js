const mongoose = require('mongoose');

const databaseConnect = () => {
    mongoose.set("strictQuery", false)
    mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        strictQuery: false
    })
        .then((data) => {
            console.log(`Database connected to ${data.connection.host}`)
        })
        .catch(() => {

        })
}

module.exports = databaseConnect;