import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import apiRoutes from "./routes/index.js";
import { AppError } from "./utils/apiError.js";

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Mount API routes
app.use("/api", apiRoutes);

// 404 Route Not Found fallback
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: "ROUTE_NOT_FOUND",
      message: "The requested route does not exist on this server.",
    },
  });
});

// Centralized Global Error Handler
app.use(
  (
    err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void => {
    if (err instanceof AppError) {
      res.status(err.statusCode).json({
        success: false,
        error: {
          code: err.errorCode,
          message: err.message,
        },
      });
      return;
    }

    console.error("[Internal Server Error]:", err);
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: err.message || "An unexpected error occurred.",
      },
    });
  }
);

export default app;