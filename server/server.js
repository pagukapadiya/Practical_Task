// server.js

const dotenv = require("dotenv");
const cluster = require("cluster");
const logger = require("./utils/logger"); // Import centralized logger

const { clusteringApp } = require("./app");
dotenv.config();

const totalCPUs = 1; // You can use require('os').cpus().length for multi-core support

/**
 * Setup Express app inside a worker process
 */
const setUpExpress = () => {
  logger.info(`🚀 Worker ${process.pid} initializing Express...`);

  const app = clusteringApp();
  const port = process.env.APP_PORT || 5001;

  const server = app.listen(port, () => {
    logger.info(`✅ App running on port ${port}`);
  });

  // App-level error logging
  app.on("error", (appErr, appCtx) => {
    logger.error("❗ App-level Error:");
    logger.error(appErr.stack || appErr);
    logger.error(`URL: ${appCtx?.req?.url}`);
    logger.error(`Headers: ${JSON.stringify(appCtx?.req?.headers, null, 2)}`);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    logger.error("💥 UNHANDLED REJECTION! Shutting down...");
    logger.error(err.stack || err);

    server.close(() => {
      process.exit(1); // Force exit
    });
  });

  // Handle graceful shutdown
  process.on("SIGTERM", () => {
    logger.warn("👋 SIGTERM received. Shutting down gracefully...");
    server.close(() => {
      logger.warn("💥 Process terminated.");
    });
  });
};

/**
 * Master process forks workers
 */
if (cluster.isMaster) {
  logger.info(`💻 Master ${process.pid} is running`);
  logger.info(`🧠 Spawning ${totalCPUs} worker(s)...`);

  // Fork worker(s)
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }

  // Restart worker on exit
  cluster.on("exit", (worker, code, signal) => {
    logger.warn(`⚠️ Worker ${worker.process.pid} exited`);
    logger.info("🔁 Forking new worker...");
    cluster.fork();
  });
} else {
  // Start server in worker process
  setUpExpress();
}
