var db = require("../database.js");

exports.index = function(req, res) {
  db.lorax.find(function(err, lorax) {
    var data = JSON.stringify(lorax);
    res.render("layout", {
      appData: data
    });
  });
  console.log("at index");
};

exports.lorax = function(req,res){
  console.log("lorax.all");
};

