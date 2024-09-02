const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MONGO_URI = "mongodb+srv://admin:7E5nJ3KKKoPZqHRI@cluster0.agasm.mongodb.net/final-project";
dotenv.config();

const connectDB = async () => {
    try {
        console.log(MONGO_URI);
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

