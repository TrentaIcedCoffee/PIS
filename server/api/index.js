'use strict'

var api = require('express').Router();
var deptsRouter = require(`${rootUri}/server/api/depts`);
var visasRouter = require(`${rootUri}/server/api/visas`);
var usersRouter = require(`${rootUri}/server/api/users`);
var loginRouter = require(`${rootUri}/server/api/login`);

api.use('/depts', deptsRouter);
api.use('/visas', visasRouter);
api.use('/users', usersRouter);
api.use('/login', loginRouter);

module.exports = api;
