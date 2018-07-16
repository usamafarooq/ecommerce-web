var db = require('../models/model.js');
exports.media = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	db.media.find()
    .then(media => {
    	res.json(media);
    }).catch(err => {
        res.json(err);
    });
};
exports.add = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var input = {
	    originalname: req.file.originalname,
	    destination: req.file.destination,
	    filename: req.file.filename,
	    path: req.file.path,
	    size: req.file.size,
	}
	const note = new db.media(input);
    note.save()
    .then(data => {
        db.media.find()
	    .then(media => {
	    	res.json(media);
	    }).catch(err => {
	        res.json(err);
	    });
    }).catch(err => {
        res.json(err);
    });
};

exports.delete = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var id = req.params.id;
	db.media.findByIdAndRemove(id)
    .then(media => {
        db.media.find()
	    .then(media => {
	    	res.json(media);
	    }).catch(err => {
	        res.json(err);
	    });
    }).catch(err => {
        res.json(err);
    });
};
