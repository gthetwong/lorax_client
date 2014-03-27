// var db = require("../database.js");
var User = require('../app/models/user');
var Plant = require('../app/models/plant');

<<<<<<< Updated upstream
exports.index = function(req, res) {
  User.find(function(err, user) {
    var data = JSON.stringify(user);
    res.render("layout", {
      appData: data
    });
=======
exports.index = function(req, res){
  
}


exports.getplants = function(req, res) {
 Plant.find({}).exec(function(err, result) {
    res.send(result);
>>>>>>> Stashed changes
  });
};



exports.getplants = function(req, res) {
 Plant.find({}).exec(function(err, result) {
    res.send(result);
  });
  console.log("at index");
};

// exports.lorax = function(req,res){
//   console.log("lorax.all");
// };
// exports.test = function(req, res){
//   User.find({}).exec(function(err,result){
//     if(!err){
//       _.each(result, function(index, item){
//         res.send(item);
//       });
//     } else{
//       console.log(err);
//     }
//   });
// };

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

