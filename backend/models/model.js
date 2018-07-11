var mongoose = require('mongoose');
var User = mongoose.Schema({
    first_name: String,
    last_name: String,
    username: { 
        type: String, 
        unique: true,
        index: true
    },
    email: { 
        type: String, 
        unique: true,
        index: true
    },
    password: String,
    role: String
}, {
    timestamps: true
});

var user_type = mongoose.Schema({
    name: String
}, {
    timestamps: true
});

var modules = mongoose.Schema({
    name: String,
    main_name: String,
    sort: String,
    icon: String,
    url: String,
    parent_id: String,
}, {
    timestamps: true
});


var permission = mongoose.Schema({
    role_id: String,
    module_id: String,
    view: String,
    view_all: String,
    created: String,
    edit: String,
    deleted: String,
    disable: String,
}, {
    timestamps: true
});

var User = mongoose.model('User', User);
var user_type = mongoose.model('user_type', user_type);
var modules = mongoose.model('modules', modules);
var permission = mongoose.model('permission', permission);
module.exports = {
    User: User, 
    user_type:user_type, 
    modules:modules, 
    permission:permission
}
//module.exports = mongoose.model(User: User, user_type:user_type);