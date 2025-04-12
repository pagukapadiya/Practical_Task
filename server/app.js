// app.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { ValidationError } = require("express-validation");

const routes = require("./routes/routes");
const response = require("./helpers/response.helper");
const logger = require("./utils/logger"); // Import centralized logger

dotenv.config();

module.exports.clusteringApp = () => {
  const app = express();

  // Enable CORS for cross-origin requests
  app.use(cors());

  // Handle JSON parsing for non-webhook routes
  app.use((req, res, next) => {
    if (req.originalUrl.startsWith(`${process.env.HOST_URL_PREFIX}webhook`)) {
      return next();
    }
    express.json({ limit: "1024mb" })(req, res, next);
  });

  // Parse URL-encoded data
  app.use(express.urlencoded({ extended: true, limit: "1024mb" }));

  // Register all routes
  routes(app);

  // Global error handler
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // Log the full error stack
    logger.error("🔥 Error Handler Triggered:");
    logger.error(err.stack || err);

    // Handle validation errors from express-validation
    if (err instanceof ValidationError) {
      const errorMessage = err.details.body
        ? err.details.body[0].message || "Validation Error"
        : "Validation Error";
      return response.errorResponse(req, res, errorMessage);
    }

    // Fallback error response
    return res.status(statusCode).json({
      status: false,
      message: err.message || "Internal Server Error",
    });
  });

  // Final fallback error middleware
  app.use(response.errorResponse);

  return app;
};
