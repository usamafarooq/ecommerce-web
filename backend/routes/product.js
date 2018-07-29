var db = require('../models/model.js');
exports.product = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	db.product.find()
    .then(product => {
    	res.json(product);
    }).catch(err => {
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
	var cat = []
	for (var i = 0; i < Object.keys(input.category).length; i++) {
		cat.push(input.category[i])
	}
	input.category = cat
	var tags = []
	for (var i = 0; i < Object.keys(input.tags).length; i++) {
		tags.push(input.tags[i])
	}
	input.tags = tags

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
	const note = new db.product(input);
    // Save Note in the database
    note.save()
    .then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
};


exports.delete = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var id = req.params.id;
	db.product.findByIdAndRemove(id)
    .then(product => {
        res.json(product);
    }).catch(err => {
        res.json(err);
    });
};