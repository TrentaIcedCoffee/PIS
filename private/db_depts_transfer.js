/**
    This script trainsfer data from db_src to db_des
    NOTE use with care
*/

'use strict'
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;

collection = null

fs.readFile('./passport.json', function(err, data) {
    if (err) {
        throw err;
    }
    var passport = JSON.parse(data);
    (function() {
        var is_exit = false;
        if (passport.db_product_uri == null
            || passport.db_product_uri == undefined
            || passport.db_product_uri == '') {
            console.log('\x1b[31mpassport.db_product_uri not valid\x1b[0m');
            is_exit = true;
        }
        if (passport.db_dev_uri == null
            || passport.db_dev_uri == undefined
            || passport.db_dev_uri == '') {
            console.log('\x1b[31mpassport.db_dev_uri not valid\x1b[0m');
            is_exit = true;
        }
        if (is_exit) {
            console.log('\x1b[31mERR\x1b[0m');
            process.exit(0);
        }
    })();
    var db_src_uri = passport.db_dev_uri;
    var db_des_uri = passport.db_product_uri;
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
                db_src.collection(collection).find().toArray(function(err, results) {
                    if (err) {
                        throw err;
                    }
                    for (var result of results) {
                        delete result._id;
                    }
                    db_des.collection(collection).insertMany(results, function(err, result) {
                        if (err) {
                            throw err;
                        }
                        console.log(`${collection}: ${result.insertedCount} inserted`);
                    });
                });
            });
        });
    });
});
