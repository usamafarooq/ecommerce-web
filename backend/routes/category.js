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

	var featured_img = []
	for (var i = 0; i < Object.keys(input.featured_img).length; i++) {
		featured_img.push(input.featured_img[i])
	}
	input.featured_img = featured_img

	var gallery = []
	for (var i = 0; i < Object.keys(input.gallery).length; i++) {
		gallery.push(input.gallery[i])
	}
	input.gallery = gallery

	var mobile_featured_img = []
	for (var i = 0; i < Object.keys(input.mobile_featured_img).length; i++) {
		mobile_featured_img.push(input.mobile_featured_img[i])
	}
	input.mobile_featured_img = mobile_featured_img

	var mobile_gallery = []
	for (var i = 0; i < Object.keys(input.mobile_gallery).length; i++) {
		mobile_gallery.push(input.mobile_gallery[i])
	}
	input.mobile_gallery = mobile_gallery

	console.log(input)
	const note = new db.category(input);
    // Save Note in the database
    note.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
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

	var featured_img = []
	for (var i = 0; i < Object.keys(input.featured_img).length; i++) {
		featured_img.push(input.featured_img[i])
	}
	input.featured_img = featured_img

	var gallery = []
	for (var i = 0; i < Object.keys(input.gallery).length; i++) {
		gallery.push(input.gallery[i])
	}
	input.gallery = gallery

	var mobile_featured_img = []
	for (var i = 0; i < Object.keys(input.mobile_featured_img).length; i++) {
		mobile_featured_img.push(input.mobile_featured_img[i])
	}
	input.mobile_featured_img = mobile_featured_img

	var mobile_gallery = []
	for (var i = 0; i < Object.keys(input.mobile_gallery).length; i++) {
		mobile_gallery.push(input.mobile_gallery[i])
	}
	input.mobile_gallery = mobile_gallery

	console.log(input)
	
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
