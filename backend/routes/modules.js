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
