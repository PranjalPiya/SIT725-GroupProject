require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URL;

const connectionOptions = {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 30000,
    bufferCommands: false,
};

async function connectDB() {
    if (!uri) {
        throw new Error("MONGO_URL is not defined in .env file");
    }

    try {
        await mongoose.connect(uri, connectionOptions);
        console.log('Connected to MongoDB');
        return mongoose.connection;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
}

async function disconnectDB() {
    try {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting MongoDB:', error);
        throw error;
    }
}

// ✅ Correct export
module.exports = { connectDB, disconnectDB };
