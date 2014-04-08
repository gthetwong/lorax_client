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


exports.sendTweet = function(req,res){
  var data = req.params;
  var owner = data.owner;
  var pi = data.pi_id;
  var sensor = data.sensor;

  var username = User.findOne({ '_id' : owner }, function(err, user) {
    if (err)
      return done(err);
    if (user) {
      // return user.twitter.username;
       var plantname = Plant.findOne({ $and: [{ 'pi_serial_id': pi_id }, { 'sensor_id': sensor }]}, function(err, plant){
        if(err)
          return done(err);
        if(plant){
          // return plant.nickname;
          tweet.statuses("update", {status: "@"+user.twitter.username+" please water "+plant.nickname+"#projectlorax"}, 
            access.at, access.ats, function(er, d, r){
              if(er){
                console.log(er);
              }
            });
        }
      });
    }
  });

};

 

//   var user = User.findOne({ 'twitter.username': req.params.username }, function(err, user) {
//       tweet.statuses("update", {status: "Good luck with your presentation! @" +user.twitter.username+" #projectlorax"}, access.at, access.ats, function(er, d, r){
//     if(er){
//         console.log(er);
//       }
//     });
//   });

// // console.log(User);
// };
