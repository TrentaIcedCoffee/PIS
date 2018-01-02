// TODO console -> log

'use strict'

var usersRouter = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var logger = require(`${rootUri}/private/logger`);
var config = require(`${rootUri}/private/config`);
var util = require(`${rootUri}/private/util`);

var Data = function(reqBody) {
    // this._id generated after inserted to db
    this.email = reqBody.email;
    this.password = reqBody.password;
    this.name = reqBody.name;
    this.phone = reqBody.phone;
    this.stop_time = reqBody.stop_time;
    this.dept_names = reqBody.dept_names;
    this.visa_types = reqBody.visa_types;
    this.working_email = reqBody.working_email;
    this.supervisor_name = reqBody.supervisor_name;
    this.supervisor_email = reqBody.supervisor_email;
    this.note = reqBody.note;
};

var goPublic = function(data) {
    delete data['password'];
    return data;
};

usersRouter.route('/')
    .get(function(req, res) {
        logger.log(req, 'GET', '/users/', {});
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbUsers).find().sort({'name': 1}).toArray(function(err, results) {
                if (err) {
                    throw err;
                }
                results = results.map(goPublic);
                res.json(results);
                db.close();
            });
        });
    })
    .post(function(req, res) {
        logger.log(req, 'POST', '/users/', req.body);
        var data = new Data(req.body);
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
                    result = goPublic(result);
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
        logger.log(req, 'GET', `/users/${req.params.id}`, {});
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbUsers).findOne({_id: new ObjectId(req.params.id)}, function(err, result) {
                if (err) {
                    throw err;
                }
                result = goPublic(result);
                res.json(result);
                db.close();
            });
        });
    })
    .post(function(req, res) {
        res.status(405).end() // not supported
    })
    .put(function(req, res) {
        logger.log(req, 'PUT', `/users/${req.params.id}`, req.body);
        var data = new Data(req.body);
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbUsers).findOne({_id: new ObjectId(req.params.id)}, function(err, result) {
                if (err) {
                    throw err;
                }
                Object.assign(result, util.goSolid(data));
                data = result;
                db.collection(config.dbUsers).updateOne({_id: new ObjectId(req.params.id)}, data, function(err, result) {
                    if (err) {
                        throw err;
                    }
                    db.collection(config.dbUsers).findOne({_id: new ObjectId(req.params.id)}, function(err, result) {
                        if (err) {
                            throw err;
                        }
                        result = goPublic(result);
                        res.json(result);
                        db.close();
                    });
                });
            });
        });
    })
    .delete(function(req, res) {
        logger.log(req, 'DELETE', `/users/${req.params.id}`, {});
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
                    result = goPublic(result);
                    res.json(result);
                    db.close();
                });
            });
        });
    });

module.exports = usersRouter;
