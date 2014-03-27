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
 var routes = require('./routes');

 var Plant = require('./app/models/plant');


// mongoose.connect(configDB.url);
var mongo = require('mongodb');

var uristring = configDB.url; //process.env.MONGOLAB_URI; // || 'mongodb://localhost/HelloMongoose';
var test = mongoose.connect(uristring, function(err, res){
  if(err){
    console.log('Error connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connecting to: '+ uristring);
  }
});

// var userSchema = new mongoose.Schema({
//   name: {
//     first: String,
//     last: {type: String, trim: true}
//   },
//   age: {type:Number, min:0}
// });

// var PUser = mongoose.model('PowerUsers', userSchema);

// var graham = new PUser({
//   name: {first: 'Graham', last: 'Wong'},
//   age: 24
// });

// graham.save(function(err) {
//   if (err){
//     console.log("error saving!");
//   }
// });



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

require('./app/routes.js')(app,passport);
require('./config/passport')(passport);

app.get('/', routes.index);
app.get('/test', routes.test);
// app.get('/lorax', routes.lorax);
// app.get('/test', function(req, res){
//   User.find({}).exec(function(err,result){
//     if(!err){
//       var user = {};
//       user.displayName = result[1].twitter.displayName;
//       user.username = result[1].twitter.username;
//       res.send(user);
//     } else{
//       console.log(err);
//     }
//   });
// });

 var port = Number(process.env.PORT || 5000);

 app.listen(port, function(){
	console.log("Listening on " + port);
});


