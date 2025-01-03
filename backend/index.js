const express = require('express')
const cors = require('cors')
const routes = require('./routes/user.routes.js')
const routesAuth = require('./routes/auth.routes.js')

require('dotenv/config')

// Initialization
const app = express()
const port = process.env.PORT

// Middlewares
app.use(express.json())

//CORS
app.use(cors())

// Routes
app.use('/', routes)
// Auth
app.use('/auth/', routesAuth)

app.get('/', (req, res) => {
  res.send('App is running!')
})

app.listen(port, (error) => {
  if (!error)
    console.log(
      'Server is Successfully Running, and App is listening on port ' + port
    )
  else console.log('Error occurred, server can`t start', error)
})

module.exports = app
