var mongoose = require('mongoose');
var slug = require('mongoose-slug-generator')
mongoose.plugin(slug)
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
    module_id: {type: mongoose.Schema.Types.ObjectId, ref: 'modules'},
    view: String,
    view_all: String,
    created: String,
    edit: String,
    deleted: String,
    disable: String,
}, {
    timestamps: true
});

var category = mongoose.Schema({
    name: String,
    sort: String,
    url: { type: String, slug: "name", slug_padding_size: 4, unique: true },
    short_description: String,
    description: String,
    parent_id: {type: mongoose.Schema.Types.ObjectId, ref: 'category'},
    featured_img:Array,
    gallery:Array,
    mobile_featured_img:Array,
    mobile_gallery:Array,
    other_fields : Array,
}, {
    timestamps: true
});

var tags = mongoose.Schema({
    name: String,
    url: { type: String, slug: "name", slug_padding_size: 4, unique: true },
    short_description: String,
    description: String,
}, {
    timestamps: true
});

var attribute = mongoose.Schema({
    name: String,
    url: { type: String, slug: "name", slug_padding_size: 4, unique: true },
    type: String,
}, {
    timestamps: true
});

var media = mongoose.Schema({
    originalname: String,
    destination: String,
    filename: String,
    path: String,
    size: String,
}, {
    timestamps: true
});

var User = mongoose.model('User', User);
var user_type = mongoose.model('user_type', user_type);
var modules = mongoose.model('modules', modules);
var permission = mongoose.model('permission', permission);
var category = mongoose.model('category', category);
var tags = mongoose.model('tags', tags);
var attribute = mongoose.model('attribute', attribute);
var media = mongoose.model('media', media);
module.exports = {
    User: User,
    user_type:user_type,
    modules:modules,
    permission:permission,
    category:category,
    tags:tags,
    attribute:attribute,
    media:media
}
//module.exports = mongoose.model(User: User, user_type:user_type);
