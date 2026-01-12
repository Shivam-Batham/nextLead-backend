import mongoose, { type Mongoose } from 'mongoose';
import "dotenv/config";

export async function dbConnect(): Promise<void> {
  try {
    const uri = process.env.DATABASE_URL;

    if (!uri) {
      throw new Error("DATABASE_URL is missing in environment variables");
    }
    const dbConnectionInstance: Mongoose = await mongoose.connect(
      `${process.env.DATABASE_URL as string}/${process.env.DB_NAME as string}`
    );
    if (dbConnectionInstance) {
      console.log('dbConnectionInstance - ', dbConnectionInstance.connection.host);
    }
  } catch (error: unknown) {
    console.log('Error in connecting Database', error as Error);
    process.exit(1);
  }
}
