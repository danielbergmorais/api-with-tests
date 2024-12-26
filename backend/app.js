const express = require("express")
const routes = require('./routes/routes.js');
require('dotenv/config');

// Initialization 
const app = express()
const port = process.env.PORT;

// Middlewares 
app.use(express.json());

// Routes
app.use('/', routes);

module.exports = app;