var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');



var app = express();
// app.engine('html', require('ejs').renderFile);

app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//app.use(express.methodOverride());

//app.use(express.static(path.join(__dirname, 'public')));

// if ('development' == app.get('env')) {
// 	app.use(express.errorHandler());
// }

var user = require('./routes/user');
var modules = require('./routes/modules');


var dbConfig = require('./config/config.js');


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


// var MongoClient = require('mongodb').MongoClient;


// var url = "mongodb://localhost:27017/ecommerce";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});


app.get("/", function (req, res) {
    res.send("Please use /admin");
});
app.get("/admin", function (req, res) {
    res.render('admin/index', {title: 'Express'});
});

app.post('/login', user.login);

app.get('/modules', modules.module);



app.use(app.router);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listing on port ' + app.get('port'));
})