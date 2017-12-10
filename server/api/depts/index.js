// TODO console -> log

var deptsRouter = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var logger = require(`${rootUri}/private/logger`);
var config = require(`${rootUri}/private/config`);
var util = require(`${rootUri}/private/util`);

// var Data = function(reqBody) {
//     this.name = reqBody.name;
//     this.college = reqBody.college;
//     this.cluster = reqBody.cluster;
// };

var goPublic = function(data) {
    delete data['_id'];
    delete data['college'];
    delete data['cluster'];
    return data;
};

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
                results = results.map(goPublic);
                res.json(results);
                db.close();
            });
        })
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

module.exports = deptsRouter;
