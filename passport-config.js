// const passport = require('passport')
// const localStrategy = require('passport-local').Strategy
// const bcrypt = require('bcrypt')



// function initialize (passport, getUserbyEmail, getUserbyId) {
//   const authenticateUser = async (email, password, done) => {
//     const user = getUserbyEmail(email);
//     if (user == null) {
//       return done(null, false, { message: 'No user with that email' })  
//     }
//     try {
//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user)
//       } else {
//         return done(null, false, { message: 'password incorrect' })
//       }
//     } 
//     catch(e) {
//       return done(e)
//     }    
//   }

//   passport.use(new localStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser))
  
//   passport.serializeUser((user, done) => done(null, user.id))
//   passport.deserializeUser((id, done) => { 
//     return done(null, getUserbyId(id))
//   })

// }





// module.exports = initialize;


/* code from passport-config */

// var passport = require('passport')
// LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));
