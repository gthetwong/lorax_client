 var express = require("express");
 var app = express();
 var mongoose = require('mongoose');
 var passport = require('passport');
 var flash = require('connect-flash');
 var configDB = require('./config/database.js');
 var logfmt = require("logfmt");
 var url = require('url');
 var path = require('path');
 var ejs = require('ejs');
 var request = require('request');
 var routes = require('./routes');
 var api_routes = require('./routes/api.js');
 var view_routes = require('./routes/views.js');
 var mongo = require('mongodb');

 var uristring = configDB.url; //process.env.MONGOLAB_URI; // || 'mongodb://localhost/HelloMongoose';
 var test = mongoose.connect(uristring, function(err, res){
  if(err){
    console.log('Error connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connecting to: '+ uristring);
  }
 });

 // all environments
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());  // including this line to try app.post below
app.use(express.methodOverride());
app.use(express.session({ secret: 'cookiemonsterlovescookies' }));
app.use(express.json());
app.use(express.urlencoded());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// app.use(logfmt.requestLogger());

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(express.logger('dev'));
}

//passport routes for login
require('./app/routes.js')(app,passport);
require('./config/passport')(passport);

app.get("/api/new_plant_template", view_routes.new_plant_template);
app.get('/api/plant_template', view_routes.plant_template);
app.get('/api/users', api_routes.getusers);

var tweet = require('./app/tweet.js');
app.get('/tweet', tweet.sendTweet);


 var port = Number(process.env.PORT || 5000);

 app.listen(port, function(){
	console.log("Listening on " + port);
});
