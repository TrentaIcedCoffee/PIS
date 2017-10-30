// TODO: cors -> same domain
// TODO: test this might be a fix

var express = require('express');
var app = express();
var _ = require('lodash');
var bodyParser = require('body-parser');
var path = require('path');

global.rootUri = __dirname;

var config = require(`${rootUri}/private/config`);
var logger = require(`${rootUri}/private/logger`);
var util = require(`${rootUri}/private/util`);
var api = require(`${rootUri}/server/api`);

// app.use(express.static(`${rootUri}/public`)); // TODO: cors -> same domain
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); // TODO: test this might be a fix

app.use(api);

console.log('listening on http://localhost: 3000');
app.listen(3000);
