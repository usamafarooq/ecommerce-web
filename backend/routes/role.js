var db = require('../models/model.js');
var per_module
exports.role = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	db.user_type.find()
    .then(role => {
    	//console.log(role)
    	res.json(role);
    }).catch(err => {
    	//console.log(err)
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
	var permission = input.permission
	// permission = permission.replace('{{','[{')
	// permission = permission.replace('}}','}]')
    //console.log(input.permission.length)
    // console.log(Object.keys(input.permission).length)
    // for (var i = 0; i < Object.keys(input.permission); i++) {
    // 	console.log(input.permission[i])
    // }
    const note = new db.user_type({
        name : input.role
    });
    
    // Save Note in the database
    note.save()
    .then(data => {

    	for (var i = 0; i < Object.keys(permission).length; i++) {
    		const per = new db.permission({
		        role_id: data._id,
			    module_id: permission[i].module_id,
			    view: permission[i].view,
			    view_all: permission[i].view_all,
			    created: permission[i].created,
			    edit: permission[i].edit,
			    deleted: permission[i].deleted,
			    disable: permission[i].disable,
		    });
		    // Save Note in the database
		    per.save()
		    .then(role_permission => {
		    	console.log(role_permission)
		    }).catch(err => {
		        console.log(err);
		    });
    	}
    	console.log(data._id)
    	console.log(input.permission)
        res.json(data._id);
    }).catch(err => {
        res.json(err);
    });
	
};

exports.edit = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var id = req.params.id;
	db.user_type.findOne({_id: id}, function(err, document) {
		res.json(document);
	});
};

exports.update = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var input = req.body;
	var firstKey = Object.keys(input)[0];
	input = JSON.parse(firstKey);
	var permission = input.permission
	for (var i = 0; i < Object.keys(permission).length; i++) {
		var input = {
		    view: permission[i].view,
		    view_all: permission[i].view_all,
		    created: permission[i].created,
		    edit: permission[i].edit,
		    deleted: permission[i].deleted,
		    disable: permission[i].disable,
	    }
		db.permission.findByIdAndUpdate(permission[i].id, input, {new: true})
	    .then(note => {
	        res.json(note);
	    }).catch(err => {
	        res.json(err);
	    });
		// const per = new db.permission({
	 //        role_id: data._id,
		//     module_id: permission[i].module_id,
		//     view: permission[i].view,
		//     view_all: permission[i].view_all,
		//     created: permission[i].created,
		//     edit: permission[i].edit,
		//     deleted: permission[i].deleted,
		//     disable: permission[i].disable,
	 //    });
	 //    // Save Note in the database
	 //    per.save()
	 //    .then(role_permission => {
	 //    	console.log(role_permission)
	 //    }).catch(err => {
	 //        console.log(err);
	 //    });
	}
};

exports.permission = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var id = req.params.id;
	// db.permission.find({role_id: id}, function(err, role) {
	// 	res.json(role);
	// });
	db.permission.find({role_id: id}).populate('module_id').exec(function (err, result) {
		res.json(result);
    //console.log(JSON.stringify(result));
   });
	/*db.modules.aggregate([
		
	   {
	     $lookup:
	       {
	         from: "permission",
	         localField: "_id",
	         foreignField: "module_id",
	         as: "permission"
	       }
	  }
	], function (err, response) {
        console.log('Error=' + err); 
          if (err){
            res.json(err);
          }
          res.json(response);
    })*/
	// db.modules.find()
 //    .then(module => {
 //    	//var mo = JSON.parse(JSON.stringify(module))
 //    	per_module = module
 //    	test(i,module[0]._id,id,res)
 //    	// for (var i = 0; i < Object.keys(module).length; i++) {
 //    	// 	//test(i,module[i]._id,id)
 //    	// 	//console.log(test(i,module[i]._id,id))
 //    	// 	var t = test(i,module[i]._id,id)
 //    	// 	//console.log(t)
 //    	// }
 //    	// console.log(per_module)
 //    	// res.json(per_module);
 //    	//console.log(mo)
 //    });
	// db.permission.find({role_id: id}, function(err, document) {
	// 	res.json(document);
	// });
};
function test(id,module_id,role_id,res) {
	//console.log(per_module[id].sort)
	//return 'test';
	db.permission.findOne({ $and: [ {module_id: module_id}, {role_id: role_id}]}, function(err, role) {
		// myObj = new Object()
		// myObj.key = id;
		// myObj.role = role;
		console.log(role)
		per_module[id].sort = role
		res.json(per_module);
		//console.log(JSON.parse(JSON.stringify(myObj)))
		//return JSON.parse(JSON.stringify(myObj))
	});
}
exports.delete = function(req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	var id = req.params.id;
	db.user_type.findByIdAndRemove(id)
    .then(module => {
        res.json(module);
    }).catch(err => {
        res.json(err);
    });
};
