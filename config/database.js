import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connection = async () => {
    try {
        const options = {
            user: process.env.DB_USER,
            pass: process.env.DB_PASSWORD,
            dbName: process.env.DB_NAME,
        };
        await mongoose.connect(process.env.DB_HOST, options);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connection;