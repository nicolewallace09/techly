const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');


// documentation: http://www.passportjs.org/docs/username-password/
console.log('I am here check 1');

passport.use(new LocalStrategy(

  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  
  async function(req, email, password, done) {

    console.log('check 2', email, password);

    let dbUser = await User.findOne({
      where: {
        //username: username
        email: email
      }
    });

    console.log('check 3', dbUser);

    let result;
    if (dbUser != null) {
      result = await dbUser.checkPassword(password);
    }

    console.log('check 4', result);

    if (!dbUser) {
      console.log('Incorrect email');
      return done(null, false, { message: 'Incorrect email!' });
    } else if (!result) {
      console.log('Incorrect password');
      return done(null, false, { message: 'Incorrect password!' });
    }
    return done(null, dbUser)
  }
));

passport.serializeUser((user, cb) => {
  console.log('check 5', user);
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;