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

app.get('/', (req, res) => {
    res.send('App is running!')
})

app.listen(port, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + port)
    else
        console.log("Error occurred, server can't start", error);
});