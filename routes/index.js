// var db = require("../database.js");
 var User = require('../app/models/user');

exports.index = function(req, res) {
  db.lorax.find(function(err, lorax) {
    var data = JSON.stringify(lorax);
    res.render("layout", {
      appData: data
    });
  });
  console.log("at index");
};

// exports.lorax = function(req,res){
//   console.log("lorax.all");
// };

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

