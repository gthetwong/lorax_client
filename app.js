 var express = require("express");
 var app = express();
 var mongoose = require('mongoose');
 var passport = require('passport');
 var flash = require('connect-flash');
 var configDB = require('./config/database.js');
 var logfmt = require("logfmt");
 var url = require('url');
 var path = require('path');

mongoose.connect(configDB.url);

 // all environments
// app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
// app.engine('handlebars', exphbs({
//   defaultLayout: 'main',
//   layoutsDir: app.get('views') + '/layouts'
// }));
// app.set('view engine', 'handlebars');
// app.use(express.favicon());
app.use(express.logger());
app.use(express.cookieParser());
app.use(express.bodyParser());  // including this line to try app.post below
app.use(express.methodOverride());
app.use(express.session({ secret: 'cookiemonsterlovescookies'}));
// app.use(express.json());
// app.use(express.urlencoded());
// app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// app.use(logfmt.requestLogger());

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.use(express.logger('dev'));
}

require('./app/routes.js')(app, passport);
require('./config/passport')(passport);

//  app.get('/', function(req, res){
//res.send('Hello World!');
//  hits backbone router or
// });

 var port = Number(process.env.PORT || 5000);

 app.listen(port, function(){
	console.log("Listening on " + port);
});

//backbone routes
//backbone views
//handlebars
//model associations
//api request
//oauth twitter
//

