// var db = require("../database.js");
var User = require('../app/models/user');
var Plant = require('../app/models/plant');

exports.index = function(req, res) {
  User.find(function(err, user) {
    var data = JSON.stringify(user);
    res.render("layout", {
      appData: data
    });
  });
};


exports.getplants = function(req, res) {
 Plant.find({}).exec(function(err, result) {
    res.send(result);
  });
  console.log("at index");
};


exports.test = function(req, res){
  User.find({}).exec(function(err,result){
    if(!err){
      var user = {};
      user.displayName = result[1].twitter.displayName;
      user.username = result[1].twitter.username;
      res.send(user);
    } else{
      console.log(err);
    }
  });
};

exports.createplant = function(req, res){
  var plant = new Plant({ 
    details: { 
      pi_serial_id : pi_serial_id,
      redline      : redline,
      nickname     : nickname,
      owner_id     : owner_id
    } 
  });
  plant.save(function(err){
    if(err){
      console.log("err");
    }
  });

};

