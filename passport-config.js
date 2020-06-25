const { authenticate } = require('passport')
const bcrypt = require('bcrypt');
const models = require('./models');
const localStrategy = require('passport-local').Strategy


function initialize (passport, getUserbyEmail) {
  const authenticateUser = (email, password, done) => {
    const user = getUserbyEmail(email);
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })  
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'password incorrect' })
      }
    } 
    catch(e) {
      return done(e)
    }
       
  }

  passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }), authenticateUser)
  
  passport.serializeUser((user, done) => { })
  passport.deserializeUser((id, done) => { })

}

module.exports = initialize;
