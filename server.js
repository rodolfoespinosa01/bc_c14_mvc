// Import express
const express = require('express');
const db = require('./config/connection')

// Import our view_routes
const view_routes = require('./controllers/view_routes');

// Create the port number and prepare for heroku with the process.env.PORT value
const PORT = process.env.PORT || 3333;

// Create the server app
const app = express();

// Open the static channel for our browser assets - ie. express.static on the public folder
app.use(express.static('./public'));

// Allow JSON to be sent from the client
app.use(express.json());


// Load our view routes at the root level '/'
app.use('/', view_routes);

// app.use('/auth', user_routes);

// Sync and create tables
db.sync({force: true})
.then(() => {
  // Start the server and log the port that it started on
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})