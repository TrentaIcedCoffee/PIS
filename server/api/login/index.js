// TODO console -> log

"use strict";

var loginRouter = require('express').Router();
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
    this.dept_names = req.body.dept_names;
    this.visa_types = req.body.visa_types;
    this.working_email = req.body.working_email;
    this.supervisor_name = req.body.supervisor_name;
    this.supervisor_email = req.body.supervisor_email;
    this.note = req.body.note;
};

var goPublic = function(data) {
    delete data['email'];
    delete data['password'];
    delete data['name'];
    delete data['phone'];
    delete data['stop_time'];
    delete data['dept_names'];
    delete data['visa_types'];
    delete data['working_email'];
    delete data['supervisor_name'];
    delete data['supervisor_email'];
    delete data['note'];
    return data;
};

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
                    result = goPublic(result);
                    res.json(result);
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
