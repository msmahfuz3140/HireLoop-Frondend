import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

if (!process.env.MONGO_DB_URI) {
    throw new Error('MONGO_DB_URI environment variable is not set');
}

const client = new MongoClient(process.env.MONGO_DB_URI);
const dbName = process.env.AUTH_DB_NAME || 'hire_loop';

// Connect to MongoDB immediately
client.connect()
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });

const db = client.db(dbName);

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: mongodbAdapter(db, {
        client
    }),
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60, // 5 minutes
        },
    },
    user: {
        additionalFields: {
            image: {
                type: 'string',
                required: false,
            },
        },
    },
});