var deptsRouter = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var logger = require(`${rootUri}/private/logger`);
var config = require(`${rootUri}/private/config`);
var util = require(`${rootUri}/private/util`);

deptsRouter.route('/')
    .get(function(req, res) {
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
            db.collection(config.dbDepts).insertOne(data, function(err, results) {
                if (err) {
                    throw err;
                }
                data._id = results.insertedId;
                db.collection(config.dbDepts).find({_id: data._id}).toArray(function(err, results) {
                    if (err) {
                        throw err;
                    }
                    if (results.length != 1) {
                        throw new Error('debugException'); // TODO
                    }
                    res.json(results[0]);

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
            db.collection(config.dbDepts).find({_id: new ObjectId(req.params.id)}).toArray(function(err, results) {
                if (err) {
                    throw err;
                }
                if (results.length != 1) {
                    throw new Error('debug') // TODO
                }
                res.json(results);
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
                    console.log(data);
                    db.close();
                });
            });
        });
    });

module.exports = deptsRouter;