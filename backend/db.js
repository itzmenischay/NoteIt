const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/noteit";


async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo Successfully!");
    } catch (error) {
        console.log(error.message);   

    }
}

module.exports = connectToMongo