// TODO console -> log

'use strict'

var visasRouter = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var logger = require(`${rootUri}/private/logger`);
var config = require(`${rootUri}/private/config`);
var util = require(`${rootUri}/private/util`);

var goPublic = function(data) {
    delete data['_id'];
    return data;
};

visasRouter.route('/')
    .get(function(req, res) {
        console.log('GET localhost:3000/visas');
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbVisas).find().sort({'name': 1}).toArray(function(err, resultsRedundant) {
                if (err) {
                    throw err;
                }
                var results = resultsRedundant.map(goPublic);
                res.json(results);
                db.close();
            });
        });
    })
    .post(function(req, res) {
        res.status(405).end() // not supported
    })
    .put(function(req, res) {
        res.status(405).end() // not supported
    })
    .delete(function(req, res) {
        res.status(405).end() // not supported
    });

module.exports = visasRouter;
