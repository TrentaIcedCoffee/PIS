// TODO console -> log

"use strict";

var loginRouter = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var logger = require(`${rootUri}/private/logger`);
var config = require(`${rootUri}/private/config`);
var util = require(`${rootUri}/private/util`);

loginRouter.route('/')
    .get(function(req, res) {
        res.status(405).end(); // not supported
    })
    .post(function(req, res) {
        console.log('POST localhost:3000/login');
        console.log(req.body);
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbUsers).findOne({email: req.body.email, password: req.body.password}, function(err, result) {
                if (err) {
                    throw err;
                }
                if (!result) {
                    res.json('{}');
                } else {
                    res.json(`{"_id": "${result._id}"}`);
                }
                db.close();
            });
        });
    })
    .put(function(req, res) {
        res.status(405).end(); // not supported
    })
    .delete(function(req, res) {
        res.status(405).end(); // not supported
    });

module.exports = loginRouter;
