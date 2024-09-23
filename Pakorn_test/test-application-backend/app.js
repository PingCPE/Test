const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/database');
const cors = require('cors');
require('dotenv').config();  // Load .env variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
// Routes
app.use('/api', userRoutes);

// Use PORT from .env or default to 3000
const port = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`API is running on port ${port}`);
    });
  })
  .catch(err => console.log('Error: ' + err));
