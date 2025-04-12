// Load environment variables from .env file
require("dotenv").config();

const Sequelize = require("sequelize");

// Initialize Sequelize instance with MySQL database credentials from environment variables
const sequelize = new Sequelize(
  process.env.DB_MYSQL_DATABASE, // Database name
  process.env.DB_MYSQL_USERNAME, // Database username
  process.env.DB_MYSQL_PASSWORD, // Database password
  {
    dialect: "mysql", // Set the SQL dialect to MySQL
    port: process.env.DB_MYSQL_PORT, // MySQL port (default is 3306)
    host: process.env.DB_MYSQL_HOST, // MySQL host address (e.g., localhost or remote IP)
    logging: console.log, // Enable logging SQL queries (disable in production or replace with custom logger)
  }
);

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ MySQL DB Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err);
  });

// Export the Sequelize instance for use in models and repositories
module.exports = sequelize;
