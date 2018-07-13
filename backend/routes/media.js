var db = require('../models/model.js');
exports.add = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	// console.log(req.file);
	// console.log(req.files);
	// console.log(req.data);
	// console.log(req.body);
	var input = {
	    originalname: req.file.originalname,
	    destination: req.file.destination,
	    filename: req.file.filename,
	    path: req.file.path,
	    size: req.file.size,
	}
	const note = new db.media(input);
    // Save Note in the database
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
    // return
    // if (req && req.file) {
    //     console.log("FILE DATA FOUND")
    // }
    //  else {
    //       console.log("NO FILE DATA FOUND")
    // }
	// db.category.find().populate('parent_id').exec(function (err, result) {
	// 	res.json(result);
 //    })
    // .then(category => {
    // 	res.json(category);
    // }).catch(err => {
    //     res.json(err);
    // });
};