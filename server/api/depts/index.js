// TODO improve crud
// TODO console -> log

var deptsRouter = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var logger = require(`${rootUri}/private/logger`);
var config = require(`${rootUri}/private/config`);
var util = require(`${rootUri}/private/util`);

deptsRouter.route('/')
    .get(function(req, res) {
        console.log(config.dbUri);
        console.log('GET localhost:3000/depts');
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbDepts).find().toArray(function(err, results) {
                if (err) {
                    throw err;
                }
                res.json(results);
                db.close();
            });
        })
    })

    .put(function(req, res) {
        console.log('PUT localhost:3000/depts');
        console.log(req.body);
        var data = {
            name: req.body.name,
            college: req.body.college,
            cluster: req.body.cluster
        };
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbDepts).insertOne(data, function(err, result) {
                if (err) {
                    throw err;
                }
                data._id = result.insertedId; // data._id: ObjectId
                db.collection(config.dbDepts).findOne({_id: data._id}, function(err, result) {
                    if (err) {
                        throw err;
                    }
                    res.json(result);
                    db.close();
                });
            });
        })
    });

deptsRouter.route('/:id')
    .get(function(req, res) {
        console.log('GET localhost:3000/depts/id');
        console.log(req.params.id);
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbDepts).findOne({_id: new ObjectId(req.params.id)}, function(err, result) {
                if (err) {
                    throw err;
                }
                res.json(result);
                db.close();
            });
        })
    })
    .post(function(req, res) {
        console.log('POST localhost:3000/depts/id');
        console.log(req.params.id);
        var data = {
            name: req.body.name,
            college: req.body.college,
            cluster: req.body.cluster
        };
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbDepts).updateOne({_id: new ObjectId(req.params.id)}, data, function(err, result) {
                if (err) {
                    throw err;
                }
                db.collection(config.dbDepts).findOne({_id: new ObjectId(req.params.id)}, function(err, result) {
                    if (err) {
                        throw err;
                    }
                    res.json(result);
                    db.close();
                });
            });
        });
    })
    .delete(function(req, res) {
        console.log('DELETE localhost:3000/depts/id');
        console.log(req.params.id);
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbDepts).findOne({_id: new ObjectId(req.params.id)}, function(err, result) {
                if (err) {
                    throw err;
                }
                var data = result;
                db.collection(config.dbDepts).removeOne({_id: new ObjectId(req.params.id)}, function(err, result) {
                    if (err) {
                        throw err;
                    }
                    res.json(data);
                    db.close();
                });
            });
        });
    });

module.exports = deptsRouter;
