var usersRouter = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var logger = require(`${rootUri}/private/logger`);
var config = require(`${rootUri}/private/config`);
var util = require(`${rootUri}/private/util`);

usersRouter.route('/')
    .get(function(req, res) {
        console.log('GET localhost:3000/users');
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbUsers).find().toArray(function(err, result) {
                if (err) {
                    throw err;
                }

                res.json(result);
            });
        });
    });

usersRouter.route('/:id')
    .get(function(req, res) {
        console.log('GET localhost:3000/users/id');
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbUsers).find({_id: new ObjectId(req.params.id)}).toArray(function(err, result) {
                if (err) {
                    throw err;
                }
                res.json(result);
            });
        });
    });

module.exports = usersRouter;