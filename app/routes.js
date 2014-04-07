// routes.js
var _ = require("underscore");
  var tweet = require('./tweet.js');
module.exports = function(app, passport){
  app.get('/tweet/:username',
    tweet.sendTweet);

  app.get('/', function(req,res){
    if(req.isAuthenticated()){
      res.render('index.html');
    } else {
      res.render('login.html');
    }
  });

  app.get('/login', function(req,res){
    res.render('index.html', {message: req.flash('loginMessage')});
  });

  app.get('/login_template', function(req,res){
    res.render('login.html'); //, {message: req.flash('loginMessage')});
  });

  app.get('/signup', function(req,res){
    res.render('index.html', {message: req.flash('signupMessage')});
  });

  app.get('/signup_template', function(req,res){
    res.render('signup.html'); //, {message: req.flash('signupMessage')});
  });

  app.get("/profile", function(req,res){
    if(req.isAuthenticated()){
      res.render('index.html');
    } else {
      res.render('login.html');
    }
  });

  app.get("/profile/:id", function(req,res){
    if(req.isAuthenticated()){
      res.render('index.html');
    } else {
      res.render('login.html');
    }
  });

  app.get('/current', isLoggedIn, function(req,res){
    // console.log(req.user);
    var user = {_id: req.user._id};
    user.local = _.pick(req.user.local, "email");
    user.twitter = _.pick(req.user.twitter, "id", "username", "displayName" );
    user.plant = _.pick(req.user.plant, "pi_serial_id", "sensor_id", "redline", "nickname", "owner_id", "plant_type");
    res.send(user);
  });

  app.get('/profile_template', function(req,res){
    if(req.isAuthenticated()){
      res.render('profile.html');
    } else {
      res.render('login.html');
    }
  });

  app.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  app.get('/auth/twitter', passport.authenticate('twitter'));
  // handle the callback after twitter has authenticated the user
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));

  // app.get('/connect/local', function(req, res) {
  //   res.render('connect-local.ejs', { message: req.flash('loginMessage') });
  // });
  // app.post('/connect/local', passport.authenticate('local-signup', {
  //   successRedirect : '/profile', // redirect to the secure profile section
  //   failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
  //   failureFlash : true // allow flash messages
  // }));

// send to twitter to do the authentication
  // app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

  // // handle the callback after twitter has authorized the user
  // app.get('/connect/twitter/callback',
  //   passport.authorize('twitter', {
  //     successRedirect : '/profile',
  //     failureRedirect : '/'
  // }));

};

function isLoggedIn(req,res,next){

  if(req.isAuthenticated())
    return next();

  res.redirect('/');
}