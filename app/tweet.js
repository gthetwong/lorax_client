var configAuth = require('../config/auth');
var access = require('../config/access');
var twitter = require('node-twitter-api');
var User = require('./models/user');

var auths = {
    consumerKey     : configAuth.twitterAuth.consumerKey,
    consumerSecret  : configAuth.twitterAuth.consumerSecret,
    callbackURL     : configAuth.twitterAuth.callbackURL
  };

var access = {
  at  : access.Token,
  ats : access.TokenSecret
};

var tweet = new twitter(auths);


// var user = User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
//   if (err)
//       return done(err);
//   if (user) {
//       return done(null, user);
//   }
// });

exports.sendTweet = function(req,res){
  var user = User.findOne({ 'twitter.username': req.params.username }, function(err, user) {
      tweet.statuses("update", {status: "thanks! @" +user.twitter.username+", from Project Lorax"}, access.at, access.ats, function(er, d, r){
    if(er){
        console.log(er);
      }
  });
  });

// console.log(User);
};
