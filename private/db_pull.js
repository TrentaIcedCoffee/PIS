// FIXME: multi-thread pull
/**
    This script pulls data from production to dev
    NOTE use with care
*/

'use strict'

var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var red = require('./red');
var passport = require('./passport');

MongoClient.connect(passport.db_production_uri, function(err, db_production) {
    if (err) {
        throw err;
    }
    MongoClient.connect(passport.db_dev_uri, function(err, db_dev) {
        if (err) {
            throw err;
        }
        db_dev.dropDatabase();
        db_production.listCollections().toArray(function(err, collections) {
            if (err) {
                throw err;
            }
            for (var collection of collections) {
                collection = collection.name;
                console.log(`inserting collection: ${collection}`);
                db_production.collection(collection).find().toArray(function(err, data) {
                    db_dev.createCollection(collection);
                    db_dev.collection(collection).insertMany(data, function(err, result) {
                        if (err) {
                            throw err;
                        }
                        // FIXME: multi-thread pull
                        console.log(`${collection}: ${result.insertedCount} inserted`);
                    });
                });
            }
            console.log('finished');
        });
    });
});
