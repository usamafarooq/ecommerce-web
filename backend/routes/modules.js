var db = require('../models/model.js');
exports.module = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	db.modules.find()
    .then(module => {
    	res.json(module);
    }).catch(err => {
        res.json(err);
    });
};
exports.usermodule = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var id = req.params.id;
	// db.modules.find().sort( { sort: 1 } )
 //    .then(module => {
 //    	res.json(module);
 //    }).catch(err => {
 //        res.json(err);
 //    });
 	db.permission.find({
      $and : [
               { 
                 $or : [ 
                         {'view' : "1"},
                         {"view_all" : "1"}
                       ]
               },
               { 
                 'role_id':id
               }
             ]
    }).populate('module_id').exec(function (err, result) {
		res.json(result);
    });
};
exports.create = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var input = req.body;
	var firstKey = Object.keys(input)[0];
	input = JSON.parse(firstKey);
	const note = new db.modules(input);
    // Save Note in the database
    note.save()
    .then(data => {
    	db.user_type.find()
	    .then(role => {
	    	for (var i = 0; i < Object.keys(role).length; i++) {
	    		const per = new db.permission({
			        role_id: role[i]._id,
				    module_id: data._id,
				    view: '0',
				    view_all: '0',
				    created: '0',
				    edit: '0',
				    deleted: '0',
				    disable: '0',
			    });
			    // Save Note in the database
			    per.save()
			    .then(role_permission => {
			    	console.log(role_permission)
			    }).catch(err => {
			        console.log(err);
			    });
	    	}
	    }).catch(err => {
	    	
	    });
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
	db.modules.findOne({_id: id}, function(err, document) {
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
	db.modules.findByIdAndUpdate(id, input, {new: true})
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
	db.modules.findByIdAndRemove(id)
    .then(module => {
        res.json(module);
    }).catch(err => {
        res.json(err);
    });
};
