/**
    This script trainsfer data from db_src to db_des
    NOTE use with care
*/

'use strict'

var db_src = {
    user: '<NAME>',
    password: '<PASSWORD>'
}

var db_des = {
    user: '<NAME>',
    password: '<PASSWORD>'
}

collection = '<COLLECTION>'

var db_src_uri = `mongodb://${db_src.user}:${db_src.password}@siss-shard-00-00-aoiln.mongodb.net:27017,siss-shard-00-01-aoiln.mongodb.net:27017,siss-shard-00-02-aoiln.mongodb.net:27017/test?ssl=true&replicaSet=siss-shard-0&authSource=admin`
var db_des_uri = `mongodb://${db_des.user}:${db_des.password}@cluster-pics-shard-00-00-zjtum.mongodb.net:27017,cluster-pics-shard-00-01-zjtum.mongodb.net:27017,cluster-pics-shard-00-02-zjtum.mongodb.net:27017/test?ssl=true&replicaSet=cluster-pics-shard-0&authSource=admin`

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(db_src_uri, function(err, db_src) {
    if (err) {
        throw err;
    }
    MongoClient.connect(db_des_uri, function(err, db_des) {
        if (err) {
            throw err;
        }
        db_src.listCollections().toArray(function(err, collections) {
            if (err) {
                throw err;
            }
            db_src.collection(COLLECTION).find().toArray(function(err, results) {
                if (err) {
                    throw err;
                }
                for (var result of results) {
                    delete result._id
                }
                db_des.collection(COLLECTION).insertMany(results, function(err, result) {
                    if (err) {
                        throw err;
                    }
                    console.log(`${COLLECTION}: ${result.insertedCount} inserted`);
                });
            });
        });
    });
});
