import mongoose from 'mongoose';

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: GlobalMongoose | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Type assertion since we've verified MONGODB_URI exists
const dbUri: string = MONGODB_URI;

globalThis.mongoose ??= { conn: null, promise: null };
const cached = globalThis.mongoose;

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    mongoose.set('strictQuery', true);
    
    cached.promise = mongoose
      .connect(dbUri, {
        bufferCommands: true,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        maxPoolSize: 50,
        minPoolSize: 10,
        maxIdleTimeMS: 10000,
        compressors: "zlib",
        retryWrites: true,
        writeConcern: {
          w: "majority"
        }
      })
      .then((mongoose) => {
        console.log('New database connection established');
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}