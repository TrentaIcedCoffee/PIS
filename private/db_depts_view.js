var MongoClient = require('mongodb').MongoClient;

var config = {
    dbUri: 'mongodb://sissdata:********#@siss-shard-00-00-aoiln.mongodb.net:27017,siss-shard-00-01-aoiln.mongodb.net:27017,siss-shard-00-02-aoiln.mongodb.net:27017/test?ssl=true&replicaSet=siss-shard-0&authSource=admin',
    dbDepts: 'depts'
};

MongoClient.connect(config.dbUri, function(err, db) {
    if (err) {
        throw err;
    }

    db.collection(config.dbDepts).find().toArray(function(err, result) {
        if (err) {
            throw err;
        }

        console.log(result);
        console.log('size ' + result.length);
        process.exit(0);
    });
});