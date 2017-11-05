// TODO console -> log

var usersRouter = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var logger = require(`${rootUri}/private/logger`);
var config = require(`${rootUri}/private/config`);
var util = require(`${rootUri}/private/util`);

var Data = function(req) {
    this.email = req.body.email;
    this.password = req.body.password;
    this.name = req.body.name;
    this.phone = req.body.phone;
    this.stop_time = req.body.stop_time;
    this.depts = req.body.depts;
    this.visa_types = req.body.visa_types;
    this.working_email = req.body.working_email;
    this.supervisor_name = req.body.supervisor_name;
    this.supervisor_email = req.body.supervisor_email;
    this.note = req.body.note;
}

usersRouter.route('/')
    .get(function(req, res) {
        console.log('GET localhost:3000/users');
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbUsers).find().toArray(function(err, results) {
                if (err) {
                    throw err;
                }
                res.json(results);
                db.close();
            });
        });
    })
    .post(function(req, res) {
        console.log('POST localhost:3000/users');
        console.log(req.body);
        var data = new Data(req);
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbUsers).insertOne(data, function(err, result) {
                if (err) {
                    throw err;
                }
                data._id = result.insertedId; // data._id: ObjectId
                db.collection(config.dbUsers).findOne({_id: data._id}, function(err, result) {
                    if (err) {
                        throw err;
                    }
                    res.json(result);
                    db.close();
                });
            });
        });
    })
    .put(function(req, res) {
        res.status(405).end() // not supported
    })
    .delete(function(req, res) {
        res.status(405).end() // not supported
    });

usersRouter.route('/:id')
    .get(function(req, res) {
        console.log('GET localhost:3000/users/id');
        console.log(req.params.id);
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbUsers).findOne({_id: new ObjectId(req.params.id)}, function(err, result) {
                if (err) {
                    throw err;
                }
                res.json(result);
                db.close();
            });
        });
    })
    .post(function(req, res) {
        res.status(405).end() // not supported
    })
    .put(function(req, res) {
        console.log('PUT localhost:3000/users/id');
        console.log(req.params.id);
        var data = new Data(req);
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbUsers).updateOne({_id: new ObjectId(req.params.id)}, data, function(err, result) {
                if (err) {
                    throw err;
                }
                db.collection(config.dbUsers).findOne({_id: new ObjectId(req.params.id)}, function(err, result) {
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
        console.log('DELETE localhost:3000/users/id');
        console.log(req.params.id);
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbUsers).findOne({_id: new ObjectId(req.params.id)}, function(err, result) {
                if (err) {
                    throw err;
                }
                var data = result;
                db.collection(config.dbUsers).removeOne({_id: new ObjectId(req.params.id)}, function(err, result) {
                    if (err) {
                        throw err;
                    }
                    // res.setHeader('Content-Type', 'application/json');
                    // res.setHeader('Access-Control-Allow-Origin', '*'); // TODO possible fix for security
                    res.json(data);
                    db.close();
                });
            });
        });
    });

module.exports = usersRouter;
