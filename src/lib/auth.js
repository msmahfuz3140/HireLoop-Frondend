import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

if (!process.env.MONGO_DB_URI) {
    throw new Error('MONGO_DB_URI environment variable is not set');
}

const client = new MongoClient(process.env.MONGO_DB_URI);
const dbName = process.env.AUTH_DB_NAME || 'hireloop-auth';

// Lazy connection - connect when first needed
let dbPromise = null;

function getDb() {
    if (!dbPromise) {
        dbPromise = client.connect().then(() => {
            console.log('Connected to MongoDB successfully');
            return client.db(dbName);
        }).catch((error) => {
            console.error('Failed to connect to MongoDB:', error);
            throw error;
        });
    }
    return dbPromise;
}

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: mongodbAdapter(client.db(dbName), {
        client
    }),
});