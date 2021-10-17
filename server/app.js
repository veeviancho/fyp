//Import installed modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');
const morgan = require('morgan');
// const path = require('path');

//Building express app/server ie Initialize the app
const app = express();

//Bodyparser middleware
//form data middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
//allow our express app to parse any JSON requests that are sent in
app.use(bodyParser.json());

//Enabling other packages/middlewares
app.use(morgan('combined')); //HTTP request logger middleware for node.js
app.use(cors()); //allow any host or client to access it (cors middleware)

//Database configuration
const db = require('./config/keys').mongoURI;

//Database connection
mongoose.connect(db, {
    useNewUrlParser: true
}).then(() => {
    console.log(`Database connected successfully ${db}`)
}).catch(err => {
    console.log(`Unable to connect to the database ${err}`)
});

//Pulling in Users route (for Profile)
const passport = require('passport');
const users = require('./routes/api/users');

app.use(passport.initialize()); //passport middleware
require('./config/passport')(passport); //passport config
app.use('/api/users', users);

//Server running on environment (eg Heroku) variable port, or port 5000 if nothing
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});