// config/passport.js

var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;

var User = require('../app/models/user');
var configAuth = require('./auth');


module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {

      process.nextTick(function() {

      User.findOne({ 'local.email' :  email }, function(err, user) {
          if (err)
              return done(err);

          if (user) {
              return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
          } else {

              var newUser = new User();

              newUser.local.email = email;
              newUser.local.password = newUser.generateHash(password);

              newUser.save(function(err) {
                  if (err)
                      throw err;
                  return done(null, newUser);
              });
          }

      });    

      });

  }));

  passport.use('local-login', new LocalStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) { // callback with email and password from our form

      User.findOne({ 'local.email' :  email }, function(err, user) {
          if (err)
              return done(err);

          if (!user)
              return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

          if (!user.validPassword(password))
              return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

          return done(null, user);
      });

  }));

  passport.use(new TwitterStrategy({

      consumerKey     : configAuth.twitterAuth.consumerKey,
      consumerSecret  : configAuth.twitterAuth.consumerSecret,
      callbackURL     : configAuth.twitterAuth.callbackURL

  },
  function(token, tokenSecret, profile, done) {

      // make the code asynchronous
// User.findOne won't fire until we have all our data back from Twitter
    process.nextTick(function() {

        User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

          // if there is an error, stop everything and return that
          // ie an error connecting to the database
            if (err)
                return done(err);

      // if the user is found then log them in
            if (user) {
                return done(null, user); // user found, return that user
            } else {
                // if there is no user, create them
                var newUser                 = new User();

        // set all of the user data that we need
                newUser.twitter.id          = profile.id;
                newUser.twitter.token       = token;
                newUser.twitter.username    = profile.username;
                newUser.twitter.displayName = profile.displayName;

        // save our user into the database
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });

      });

  }));

};
