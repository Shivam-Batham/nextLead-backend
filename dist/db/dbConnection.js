import mongoose from 'mongoose';
import "dotenv/config";
export async function dbConnect() {
    try {
        const uri = process.env.DATABASE_URL;
        if (!uri) {
            throw new Error("DATABASE_URL is missing in environment variables");
        }
        const dbConnectionInstance = await mongoose.connect(`${process.env.DATABASE_URL}/${process.env.DB_NAME}`);
        if (dbConnectionInstance) {
            console.log('dbConnectionInstance - ', dbConnectionInstance.connection.host);
        }
    }
    catch (error) {
        console.log('Error in connecting Database', error);
        process.exit(1);
    }
}
