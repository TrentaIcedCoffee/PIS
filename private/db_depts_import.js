/*
    This script imports data from MySQL to Mongo
    NOTE use with care
*/
var mongoUser = '*'; // config.dbUser
var mongoPwd = '*'; // config.dbPwd
var mysqlHost = '*';
var mysqlUser = '*';
var mysqlPwd = '*';
var mysqlDbName = '*';
var mysqlTable = '*'

var config = {
    dbUri: `mongodb://${mongoUser}:${mongoPwd}@siss-shard-00-00-aoiln.mongodb.net:27017,siss-shard-00-01-aoiln.mongodb.net:27017,siss-shard-00-02-aoiln.mongodb.net:27017/test?ssl=true&replicaSet=siss-shard-0&authSource=admin`,
    dbDepts: 'depts'
};

var MongoClient = require('mongodb').MongoClient;
var mysql = require('mysql');

var data = [];

var Model = function(name, college, cluster) {
    this.name = name;
    this.college = college === undefined ? null : college;
    this.cluster = cluster === undefined ? null : cluster;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
}

// replaceAll & -> and, space -> _
var regulateString = function(string) {
    if (string === null || typeof string !== 'string') {
        return string;
    }
    return string.trim().replaceAll('&', 'and').replaceAll(' ', '_').toLowerCase();
}

var regulateData = function(data) {
    for (var i in data) {
        if (!data[i] && typeof data[i] === 'string') {
            data[i] = regulateString(data[i]);
        }
    }
    return data;
}

var connection = mysql.createConnection({
    host: mysqlHost,
    user: mysqlUser,
    password: mysqlPwd,
    database: mysqlDbName
});

connection.connect(function(err) {
    if (err) {
        throw err;
    }
    connection.query(`SELECT * FROM \`${mysqlTable}\`;`, function (err, result, fields) {
       if (err) {
           throw err;
       }
       for (var val of result) {
           data.push(regulateData(new Model(val[fields[1].name], val[fields[3].name], val[fields[2].name])));
       }
       MongoClient.connect(config.dbUri, function(err, db) {
           if (err) {
               throw err;
           }
           db.collection(config.dbDepts).insertMany(data, function(err, res) {
               if (err) {
                   throw err;
               }
               console.log('insert finished ' + res.insertedCount);
               db.close();
               process.exit(0);
           });
       });
    });
});
