var api = require('express').Router();
var deptsRouter = require(`${rootUri}/server/api/depts`);
var usersRouter = require(`${rootUri}/server/api/users`);
var visasRouter = require(`${rootUri}/server/api/visas`);

api.use('/depts', deptsRouter);
api.use('/users', usersRouter);
api.use('/visas', visasRouter);

module.exports = api;
