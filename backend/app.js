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

var multer = require('multer');
var upload = multer({ dest: '../uploads/' })



var user = require('./routes/user');
var roles = require('./routes/role');
var modules = require('./routes/modules');
var category = require('./routes/category');
var media = require('./routes/media');


app.get("/", function (req, res) {
    res.send("Please use /admin");
});
app.get("/admin", function (req, res) {
    res.render('admin/index', {title: 'Express'});
});

app.post('/addmedia', upload.single('media'), media.add);

app.post('/login', user.login);

app.post('/createuser', user.create);


app.get('/users', user.users);

app.get('/edituser/:id', user.edituser);

app.get('/deleteuser/:id', user.deleteuser);

app.post('/updateuser/:id', user.updateuser);

app.get('/role', roles.role);

app.post('/createrole', roles.create);

app.get('/editrole/:id', roles.edit);

app.post('/updaterole', roles.update);

app.get('/role_permission/:id', roles.permission);

app.get('/deleterole/:id', roles.delete);

app.get('/usermodules/:id', modules.usermodule);

app.get('/modules', modules.module);

app.post('/createmodule', modules.create);

app.get('/editmodule/:id', modules.edit);

app.get('/deletemodule/:id', modules.delete);

app.post('/updatemodule/:id', modules.update);

app.get('/category', category.category);

app.post('/createcategory', category.create);

app.get('/editcategory/:id', category.edit);

app.get('/deletecategory/:id', category.delete);

app.post('/updatecategory/:id', category.update);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listing on port ' + app.get('port'));
})