//importing modules that have been installed
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

//build up an express app (building an express server)
const app = express()

//enabling packages
app.use(morgan('combined')) //HTTP request logger middleware for node.js
app.use(bodyParser.json()) //allow our express app to parse any JSON requests that are sent in
app.use(cors()) //allow any host or client to access it

//GET request to 'status' endpoint
app.get('/status', (req, res) => {
    res.send({
        message: 'Hello World'
    })
})

//we have the server running on port 8081
//overwriting port using env variables
app.listen(process.env.PORT || 8081)