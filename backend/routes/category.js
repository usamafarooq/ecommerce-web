var db = require('../models/model.js');
exports.category = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	db.category.find().populate('parent_id').exec(function (err, result) {
		res.json(result);
    })
    // .then(category => {
    // 	res.json(category);
    // }).catch(err => {
    //     res.json(err);
    // });
};

exports.create = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var input = req.body;
	var firstKey = Object.keys(input)[0];
	input = JSON.parse(firstKey);
	console.log(input)
	// const note = new db.category(input);
  //   // Save Note in the database
  //   note.save()
  //   .then(data => {
  //       res.json(data);
  //   }).catch(err => {
  //       res.json(err);
  //   });
};

exports.edit = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var id = req.params.id;
	db.category.findOne({_id: id}, function(err, document) {
		res.json(document);
	});
};

exports.update = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var id = req.params.id;
	var input = req.body;
	var firstKey = Object.keys(input)[0];
	input = JSON.parse(firstKey);
	db.category.findByIdAndUpdate(id, input, {new: true})
    .then(note => {
        res.json(note);
    }).catch(err => {
        res.json(err);
    });
};

exports.delete = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var id = req.params.id;
	db.category.findByIdAndRemove(id)
    .then(category => {
        res.json(category);
    }).catch(err => {
        res.json(err);
    });
};
