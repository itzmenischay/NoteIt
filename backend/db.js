require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.DB_CONNECTION_STRING;

async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Mongo Successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
}

module.exports = connectToMongo;
