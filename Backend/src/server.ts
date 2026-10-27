import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 5000;

/**
 * Boots the database connection and HTTP listener
 */
const startServer = async (): Promise<void> => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`[Server] Tic-Tac-Toe backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("[Server] Failed to launch backend service:", error);
    process.exit(1);
  }
};

startServer();