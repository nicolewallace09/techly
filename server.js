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

// passport middleware
//var app = express();
//app.use(require('serve-static')(__dirname + '/../../public'));
// const passport = require('passport');
// const flash = require('express-flash')
// var cookieParser = require('cookie-parser')



// const initializePassport = require('/passport-config');

// initializePassport(
//   passport, 
//   email => users.find(user => user.email === email)
// );
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));


// app.use(flash())
// app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// app.use(passport.initialize());
// app.use(passport.session());


// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {    // true will recrete the tables, set back to false after creating
  app.listen(PORT, () => console.log('Now listening on port ' + PORT));
});