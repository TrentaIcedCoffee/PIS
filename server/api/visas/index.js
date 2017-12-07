// TODO console -> log

var visasRouter = require('express').Router();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var logger = require(`${rootUri}/private/logger`);
var config = require(`${rootUri}/private/config`);
var util = require(`${rootUri}/private/util`);

var Data = function(...args) {
    var _id = undefined;
    var name = undefined;

    if (args.length == 1 && args[0] instanceof Data) {
        var that = args[0];
        _id = that._id;
        name = that.name;
    } else if (args.length == 2) {
        _id = args[0];
        name = args[1];
    }
    
    this._id = _id;
    this.name = name;
};

var goPublic = function(data) {
    var dataPublic = new Data(data);
    delete dataPublic['_id'];
    return dataPublic;
};

visasRouter.route('/')
    .get(function(req, res) {
        console.log('GET localhost:3000/visas');
        MongoClient.connect(config.dbUri, function(err, db) {
            if (err) {
                throw err;
            }
            db.collection(config.dbVisas).find().toArray(function(err, results) {
                if (err) {
                    throw err;
                }
                results = results.map(function(val) {
                    return goPublic(val);
                });
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
