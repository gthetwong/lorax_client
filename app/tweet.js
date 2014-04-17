var configAuth = require('../config/auth');
var access = require('../config/access');
var twitter = require('node-twitter-api');
var User = require('./models/user');
var Plant = require('./models/plant');

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
  var been_dry = data.timedif;

  var username = User.findOne({ '_id' : owner }, function(err, user) {
    if (err)
      return done(err);
    if (user) {
      // return user.twitter.username;
      var now = new Date(Date.now());
      var timeNow = now.toLocaleTimeString("en-US", {hour: "numeric", minute:"numeric", month:"numeric", day:"numeric"});
       var plantname = Plant.findOne({ $and: [{ 'pi_serial_id': pi }, { 'sensor_id': sensor }]}, function(err, plant){
        if(err)
          return done(err);
        if(plant){
          // return plant.nickname;
          console.log(been_dry);
          console.log(user);
          console.log(plant);
          switch(been_dry) {
            case 2:
              tweet.statuses("update", {status: "@"+user.twitter.username+" please water me, sincerely "+plant.nickname+"#projectlorax "+timeNow}, 
              access.at, access.ats, function(er, d, r){
                if(er){
                  console.log(er);
                }
              });
            break;
            case 12:
              tweet.statuses("update", {status: "@"+user.twitter.username+" please water me, sincerely "+plant.nickname+" #projectlorax "+timeNow}, 
              access.at, access.ats, function(er, d, r){
                if(er){
                  console.log(er);
                }
              });
            break;
            case 24:
              tweet.statuses("update", {status: "@"+user.twitter.username +", you need to water me soon... #projectlorax " + timeNow }, access.at, access.ats, function(er, d, r){
              if (er){console.log(er);}
            });
            break;
            case 48:
              tweet.statuses("update", {status: "Don't forget about your pal "+ plant.nickname + ", @" + user.twitter.username+". It's been two days since they've been over the redline! #projectlorax " + timeNow}, access.at, access.ats, function(er, d, r){
              if (er){console.log(er);}
            });
            break;
            case 72:
               tweet.statuses("update", {status: "@"+ user.twitter.username + ", this is your final warning... "+ plant.nickname + " needs to be watered! Don't neglect your plant friend!  #projectlorax " + timeNow},
                access.at, access.ats, function(er, d, r){
              if (er){console.log(er);}
            });
            break;
          }
          res.send("200, success");
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
