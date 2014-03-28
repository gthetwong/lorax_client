// routes.js

module.exports = function(app, passport){
  app.get('/', function(req,res){
    res.render('index.html');
  });

  app.get('/login', function(req,res){
    res.render('index.html', {message: 'signupMessage'});
  });

  app.get('/login_template', function(req,res){
    res.render('login.html'); //, {message: req.flash('loginMessage')});
  });

  app.get('/signup', function(req,res){
    res.render('index.html', {message: 'signupMessage'});
  });

  app.get('/signup_template', function(req,res){
    res.render('signup.html'); //, {message: req.flash('signupMessage')});
  });

  app.get('/profile', isLoggedIn, function(req,res){
    res.render('index.html', {
      user : req.user
    });
  });

  app.get('/profile_template', isLoggedIn, function(req,res){
    console.log(req.user);
    res.render('profile.html', {
      user : req.user
    });
  });

  app.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    // failureFlash : true // allow flash messages
  }));

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    // failureFlash : true // allow flash messages
  }));

  app.get('/auth/twitter', passport.authenticate('twitter'));
  // handle the callback after twitter has authenticated the user
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
      successRedirect : '/profile',
      failureRedirect : '/'
    }));

};

function isLoggedIn(req,res,next){

  if(req.isAuthenticated())
    return next();

  res.redirect('/');
}