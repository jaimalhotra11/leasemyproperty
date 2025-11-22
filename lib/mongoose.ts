import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

let cached = (global as any)._mongoose;
if (!cached) {
  cached = (global as any)._mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn as typeof mongoose;
  if (!MONGODB_URI) throw new Error('MONGODB_URI is not set');
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn as typeof mongoose;
}