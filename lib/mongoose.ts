import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

let cached = (global as any)._mongoose;
if (!cached) {
  cached = (global as any)._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn as typeof mongoose;
  if (!MONGODB_URI) {
    console.warn('MONGODB_URI is not set - some features may not work');
    return null as any;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).catch((err) => {
      console.error('MongoDB connection error:', err.message);
      console.warn('Continuing without database connection...');
      return null;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn as typeof mongoose;
}