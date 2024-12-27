const express = require('express')
const routes = require('./routes/user.routes.js')
const routesAuth = require('./routes/auth.routes.js')

require('dotenv/config')

// Initialization
const app = express()

// Middlewares
app.use(express.json())

// Routes
app.use('/', routes)
// Auth
app.use('/auth/', routesAuth)

module.exports = app
