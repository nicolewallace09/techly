const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');


// helper function
const helpers = require('./utils/helpers');

// handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});

// session (connects session to sequelize Database) --> authentication 
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3001;

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'project2 super secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);


/************ PASSPORT *********************************************/

var express = require('express') // redundant
var app = express() // redundant
var passport = require('passport')
var session = require('express-session') // redundant
var bodyParser = require('body-parser')  // don't believe I need this anymore
var env = require('dotenv').config()  // this is in ./config/connection.js
var exphbs = require('express-handlebars') // redundant
 
 
//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
 
// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
 
//For Handlebars (not using; already set above)
/*
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
*/ 

// not using since homepage route exists
/*
app.get('/', function(req, res) {
    res.send('Welcome to Passport with Sequelize');
});
*/

//Models
var models = require("./models");
 
//Routes
var authRoute = require('./utils/auth.js')(app); // I don't think I am passing in the correct "app"
 
 
//load passport strategies
require('./public/javascript/passport.js')(passport, models.user);
 
 
//Sync Database (not using; have similar code at bottom of page)
/*
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine')
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!")
});
 
app.listen(5000, function(err) {
    if (!err)
        console.log("Site is live");
    else console.log(err)
});
*/










// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {    // true will recrete the tables, set back to false after creating
  app.listen(PORT, () => console.log('Now listening on port ' + PORT));
});
