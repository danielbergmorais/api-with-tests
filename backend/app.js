const express = require('express')
const cors = require('cors')
const routes = require('./routes/user.routes.js')
const routesAuth = require('./routes/auth.routes.js')

require('dotenv/config')

// Initialization
const app = express()

// Middlewares
app.use(express.json())

//CORS
app.use(cors())

// Routes
app.use('/', routes)
// Auth
app.use('/auth/', routesAuth)

module.exports = app
