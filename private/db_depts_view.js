/**
    This script views all dept in Mongo
*/

'use strict'

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
    db.collection(config.dbDepts).find().toArray(function(err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
        console.log('result size ' + result.length);
        process.exit(0);
    });
});
