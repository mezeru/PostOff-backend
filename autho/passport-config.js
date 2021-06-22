var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const credentialsModel = require('../model/credentials');

module.exports = passport.use(new LocalStrategy(
  function(username, password, done) {
    credentialsModel.findOne({ name: name }, function (err, user) {
      if (err) { return done(err); }
      console.log("here")
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

