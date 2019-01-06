"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const passport_local_1 = __importDefault(require("passport-local"));
const user_1 = require("../classes/user");
var localStrategy = passport_local_1.default.Strategy;
passport.use(new localStrategy({
    usernameField: 'email'
}, function (username, password, done) {
    user_1.model.findOne({ email: username }, function (err, user) {
        if (err) {
            return done(err);
        }
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
}));
