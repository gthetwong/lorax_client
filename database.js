var dbUrl = "library";
var collections = ["lorax"];

var db = require("mongojs").connect(dbUrl, collections);
module.exports = db;
