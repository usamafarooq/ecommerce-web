var db = require('../models/model.js');
exports.login = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var input = req.body;
	var firstKey = Object.keys(input)[0];
	input = JSON.parse(firstKey);
	db.User.findOne({email:input.email,password:input.password}, function(err, user) {
		console.log(user)
	  	res.json(user);
	});
};

exports.users = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	db.User.find()
    .then(user => {
    	console.log(user)
    	res.json(user);
    }).catch(err => {
    	console.log(user)
        res.json(err);
    });
};

exports.create = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var input = req.body;
	var firstKey = Object.keys(input)[0];
	input = JSON.parse(firstKey);
	const note = new db.User(input);
    // Save Note in the database
    note.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
};

exports.edituser = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var id = req.params.id;
	db.User.findOne({_id: id}, function(err, document) {
		res.json(document);
	});
};

exports.updateuser = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var id = req.params.id;
	var input = req.body;
	var firstKey = Object.keys(input)[0];
	input = JSON.parse(firstKey);
	db.User.findByIdAndUpdate(id, input, {new: true})
    .then(note => {
        res.json(note);
    }).catch(err => {
        res.json(err);
    });
};

exports.deleteuser = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var id = req.params.id;
	db.User.findByIdAndRemove(id)
    .then(user => {
        res.json(user);
    }).catch(err => {
        res.json(err);
    });
};
