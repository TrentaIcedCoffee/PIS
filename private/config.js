'use strict'

var config = {};

config.dbUser = 'sissdata';
config.dbPwd = 'Abceasyas123#';
config.dbUri = `mongodb://${config.dbUser}:${config.dbPwd}@siss-shard-00-00-aoiln.mongodb.net:27017,siss-shard-00-01-aoiln.mongodb.net:27017,siss-shard-00-02-aoiln.mongodb.net:27017/test?ssl=true&replicaSet=siss-shard-0&authSource=admin`;
config.dbUsers = 'users';
config.dbDepts = 'depts';
config.dbVisas = 'visas';
config.logUri = `${rootUri}/log.txt`;

module.exports = config;
