// Import express
const express = require('express');
const db = require('./config/connection');

const { engine }=require('express-handlebars');

const session = require('express-session');

// Import our view_routes
const view_routes = require('./controllers/view_routes');
const user_routes = require('./controllers/user_routes');
const post_routes = require('./controllers/post_routes');
const comment_routes = require('./controllers/comment_routes');

// Create the port number and prepare for heroku with the process.env.PORT value
const PORT = process.env.PORT || 3001;

// Create the server app
const app = express();

// Open the static channel for our browser assets - ie. express.static on the public folder
app.use(express.static('./public'));

// Allow JSON to be sent from the client - this is the way it was sent when we used html
// app.use(express.json());

// this is how we need to send it when using handlebars since it sends the data through urlencoding
app.use(express.urlencoded({extended: false}));


// Load express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))


// Load our view routes at the root level '/'
app.use('/', [view_routes, post_routes, comment_routes]);

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Load our user routes at the root level '/'
app.use('/auth', user_routes);

// app.use('/auth', user_routes);

// Sync and create tables
db.sync({force: true})
.then(() => {
  // Start the server and log the port that it started on
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});