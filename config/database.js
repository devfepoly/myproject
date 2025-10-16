import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_URI = "mongodb+srv://huynhqui6425:Qui060425@blog.1fwin.mongodb.net/";
const DATABASE_NAME = process.env.DB_NAME?.trim() || "laptop-shop";
const connectionString = process.env.DB_URI?.trim() || DEFAULT_URI;

if (!connectionString) {
    throw new Error("[database] Missing MongoDB connection string. Set DB_URI in your environment.");
}

let cachedDbPromise;
let cachedClient;

async function initialiseConnection() {
    const client = new MongoClient(connectionString);
    await client.connect();
    cachedClient = client;
    return client.db(DATABASE_NAME);
}

export async function connectDB() {
    if (!cachedDbPromise) {
        cachedDbPromise = initialiseConnection().catch(error => {
            cachedDbPromise = undefined;
            console.error("[database] Failed to connect to MongoDB:", error);
            throw error;
        });
    }

    return cachedDbPromise;
}

export function getMongoClient() {
    return cachedClient;
}

export default connectDB;
