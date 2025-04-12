const { createLogger, format, transports } = require('winston');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

// Create logs directory if it doesn't exist
const logDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define log formatting
const logFormat = format.printf(({ timestamp, level, message }) => {
  const color =
    level === 'error'
      ? chalk.red
      : level === 'warn'
      ? chalk.yellow
      : level === 'info'
      ? chalk.cyan
      : chalk.white;

  return `${chalk.gray(timestamp)} [${color(level.toUpperCase())}]: ${message}`;
});

// Create logger instance
const logger = createLogger({
  level: 'debug', // Minimum log level to capture
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json() // Used for file logs
  ),
  transports: [
    // Console transport with custom formatting
    new transports.Console({
      format: format.combine(format.timestamp(), logFormat),
    }),

    // File transport for error logs
    new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),

    // File transport for all logs
    new transports.File({ filename: path.join(logDir, 'combined.log') }),
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

module.exports = logger;
