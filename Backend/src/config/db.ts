import mongoose from "mongoose";

/**
 * Establishes connection to MongoDB Atlas database cluster
 */
export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error("MONGO_URI environment variable is not defined in .env file.");
    }

    const connectionInstance = await mongoose.connect(mongoUri);
    console.log(`[MongoDB] Connected successfully to host: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("[MongoDB] Database connection error:", error);
    process.exit(1);
  }
};