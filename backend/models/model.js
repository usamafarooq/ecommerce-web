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
    phone: String,
    role: {type: mongoose.Schema.Types.ObjectId, ref: 'user_type'}
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
    featured_img:[{type:mongoose.Schema.Types.ObjectId,ref: 'media'}],
    gallery:[{type:mongoose.Schema.Types.ObjectId,ref: 'media'}],
    mobile_featured_img:[{type:mongoose.Schema.Types.ObjectId,ref: 'media'}],
    mobile_gallery:[{type:mongoose.Schema.Types.ObjectId,ref: 'media'}],
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

var attributeterm = mongoose.Schema({
    attribute_id: {type: mongoose.Schema.Types.ObjectId, ref: 'attribute'},
    name: String,
    url: { type: String, slug: "name", slug_padding_size: 4, unique: true },
    color: String,
    image: [{type:mongoose.Schema.Types.ObjectId,ref: 'media'}],
    text: String,
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

var product = mongoose.Schema({
    name: String,
    url: { type: String, slug: "name", slug_padding_size: 4, unique: true },
    short_description: String,
    description: String,
    category: [{type:mongoose.Schema.Types.ObjectId,ref: 'category'}],
    tags: [{type:mongoose.Schema.Types.ObjectId,ref: 'tags'}],
    regular_price: String,
    sale_price: String,
    sale_date: Date,
    featured: String,
    featured_date: Date,
    deal: String,
    deal_date: Date,
    sku: String,
    quantity: String,
    stock: String,
    featured_img: [{type:mongoose.Schema.Types.ObjectId,ref: 'media'}],
    gallery: [{type:mongoose.Schema.Types.ObjectId,ref: 'media'}],
    mobile_featured_img: [{type:mongoose.Schema.Types.ObjectId,ref: 'media'}],
    mobile_gallery: [{type:mongoose.Schema.Types.ObjectId,ref: 'media'}],
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
var attributeterm = mongoose.model('attributeterm', attributeterm);
var media = mongoose.model('media', media);
var product = mongoose.model('product', product);
module.exports = {
    User: User,
    user_type:user_type,
    modules:modules,
    permission:permission,
    category:category,
    tags:tags,
    attribute:attribute,
    attributeterm:attributeterm,
    media:media,
    product:product
}
//module.exports = mongoose.model(User: User, user_type:user_type);
