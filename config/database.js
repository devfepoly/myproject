import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_URI = "mongodb+srv://huynhqui6425:Qui060425@blog.1fwin.mongodb.net/";
const DATABASE_NAME = process.env.DB_NAME?.trim() || "laptop-shop";
const connectionString = process.env.DB_URI?.trim() || DEFAULT_URI;

if (!connectionString) {
    throw new Error("[database] Missing MongoDB connection string. Set DB_URI in your environment.");
}

let db;

try {
    const client = new MongoClient(connectionString);
    const conn = await client.connect();
    db = conn.db(DATABASE_NAME);
} catch (error) {
    console.error("[database] Failed to connect to MongoDB:", error);
    throw error;
}

export default db;
