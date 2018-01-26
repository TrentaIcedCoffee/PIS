/**
    This script drops specific user with id from db
    NOTE use with care
*/

'use strict'

config = require('./config');

if (process.argv.length != 3) {
    console.log('Incorrect parameters');
} else {
    var input = process.argv[2];
    console.log(input);
}

process.exit(1);
// process.argv

var mongoUser = '*'; // config.dbUser
var mongoPwd = '*'; // config.dbPwd
// TODO: hard-code -> config file

var config = {
    dbUri: `mongodb://${mongoUser}:${mongoPwd}@siss-shard-00-00-aoiln.mongodb.net:27017,siss-shard-00-01-aoiln.mongodb.net:27017,siss-shard-00-02-aoiln.mongodb.net:27017/test?ssl=true&replicaSet=siss-shard-0&authSource=admin`,
    dbUsers: 'users'
};

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

MongoClient.connect(config.dbUri, function(err, db) {
    if (err) {
        throw err;
    }


    db.collection(config.dbUsers).findOne({_id: new ObjectId(id)}, function(err, result) {
        if (err) {
            throw err;
        }
        var data = result;
        db.collection(config.dbUsers).removeOne({_id: new ObjectId(req.params.id)}, function(err, result) {
            if (err) {
                throw err;
            }
            result = goPublic(result);
            res.json(result);
            db.close();
        });
    });
});
