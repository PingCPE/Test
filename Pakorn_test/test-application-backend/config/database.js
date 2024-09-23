// Load environment variables
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // Username
  process.env.DB_PASS,      // Password
  {
    host: 'postgresdb',  // Hostname
    dialect: 'postgres',
    port: 5432,  // Database dialect
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.log('Error: ' + err));

// Export the sequelize instance
module.exports = sequelize;
