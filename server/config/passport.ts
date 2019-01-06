import passport = require('passport');
import LocalStrategy from 'passport-local';
import {model} from '../classes/user';

var localStrategy = LocalStrategy.Strategy;

passport.use(new localStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    model.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));
