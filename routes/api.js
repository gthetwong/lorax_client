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
 
  console.log(req.body);
  var plant = new Plant({ 
    details: req.body
  });
  
  plant.save(function(err){
    if(err){
      console.log("err");
    }
  });

};

