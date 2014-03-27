var middleMan = require("../index.js");
var nock = require("nock");
var assert = require("assert");

var jqueryGet = nock('http://pulldown-api.herokuapp.com').get('/set/jquery').reply(200, ["foo.js"]);
var indexGet = nock('http://pulldown-api.herokuapp.com').get('/').reply(200, { "jquery": "foo.js" });

middleMan.set("jquery", function(data) {
  assert.equal("foo.js", data[0]);
});

middleMan.index(function(data) {
  assert.equal("foo.js", data["jquery"]);
});

