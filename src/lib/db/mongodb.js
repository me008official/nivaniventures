import mongoose from "mongoose";

const getMongoUri = () => process.env.MONGODB_URI || process.env.NEXT_APP_MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    const mongoUri = getMongoUri();

    if (!mongoUri) {
        throw new Error("Please define MONGODB_URI or NEXT_APP_MONGODB_URI in the environment");
    }

    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            dbName: "nivini",
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(mongoUri, opts).then((mongooseInstance) => {
            console.log("=> New MongoDB Connection Established");
            return mongooseInstance;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;