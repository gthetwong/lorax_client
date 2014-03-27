var User = require('../app/models/user');
var Plant = require('../app/models/plant');

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

