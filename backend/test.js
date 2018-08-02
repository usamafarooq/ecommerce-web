var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("ecommerce");
  dbo.collection('attributeterm').aggregate([
    { $lookup:
       {
         from: dbo.collection('attribute'),
         localField: 'attribute_id',
         foreignField: '_id.str',
         as: 'orderdetails'
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
});