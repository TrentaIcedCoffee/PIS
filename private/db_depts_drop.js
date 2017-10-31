/*
    This script drops all data in Mongo
    NOTE use with care
*/
var mongoUser = '*'; // config.dbUser
var mongoPwd = '*'; // config.dbPwd

var config = {
    dbUri: `mongodb://${mongoUser}:${mongoPwd}@siss-shard-00-00-aoiln.mongodb.net:27017,siss-shard-00-01-aoiln.mongodb.net:27017,siss-shard-00-02-aoiln.mongodb.net:27017/test?ssl=true&replicaSet=siss-shard-0&authSource=admin`,
    dbDepts: 'depts'
};

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(config.dbUri, function(err, db) {
    if (err) {
        throw err;
    }
    db.collection(config.dbDepts).drop(function(err, ok) {
        if (err) {
            throw err;
        }
        console.log('depts dropped');
        db.close();
        process.exit(0);
    });
});
