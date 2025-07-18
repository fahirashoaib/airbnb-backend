// dbConnect.js
const Mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const localDB = process.env.MONGODB_URI;
// Database connection
const connectDB = async () => {
    try {
        await Mongoose.connect(localDB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;