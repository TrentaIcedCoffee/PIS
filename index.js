'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

global.rootUri = __dirname;

var config = require(`${rootUri}/private/config`);
var logger = require(`${rootUri}/private/logger`);
var util = require(`${rootUri}/private/util`);
var api = require(`${rootUri}/server/api`);

app.use(express.static(`${rootUri}/public`));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(api);

app.listen(80);
console.log('listening on port 80');
