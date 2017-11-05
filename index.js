// TODO: cors -> same domain

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

global.rootUri = __dirname;

var cors = require(`${rootUri}/public/middleware_cors`); // cors
var config = require(`${rootUri}/private/config`);
var logger = require(`${rootUri}/private/logger`);
var util = require(`${rootUri}/private/util`);
var api = require(`${rootUri}/server/api`);

// app.use(express.static(`${rootUri}/public`)); // spaceholder for cors -> same domain
app.use(cors); // TODO: cors -> same domain
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(api);

console.log('listening on http://localhost: 3000');
app.listen(3000);
