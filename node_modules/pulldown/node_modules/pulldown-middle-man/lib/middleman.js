var request = require("request");

var middleMan = {
  apiBase: "http://pulldown-api.herokuapp.com",
  set: function(search, callback) {
    request(this.apiBase + "/set/" + search, function(error, response, body) {
      callback(JSON.parse(body));
    });
  },
  index: function(callback) {
    request(this.apiBase, function(err, resp, body) {
      callback(JSON.parse(body));
    });
  }
};

module.exports = middleMan;
