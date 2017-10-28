var api = require('express').Router();
var deptsRouter = require(`${rootUri}/server/api/depts`);
var usersRouter = require(`${rootUri}/server/api/users`);

api.use('/depts', deptsRouter);
api.use('/users', usersRouter);

module.exports = api;

