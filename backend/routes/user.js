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
