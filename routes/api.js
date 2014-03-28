var User = require('../app/models/user');
var Plant = require('../app/models/plant');

exports.getplants = function(req, res) {
 Plant.find({}).exec(function(err, result) {
    res.send(result);
  });
};

exports.getplant = function(req, res) {
 Plant.find({"_id": req.params.id}).exec(function(err, result) {
    res.send(result);
  });
};

exports.getusers = function(req, res) {
  User.find({}).exec(function(err, result){
    res.send(result);
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

