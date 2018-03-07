'use strict'

var fs = require('fs');
var red = require('./red');
var passport = require('./passport.json');

var passport_fields = ['db_dev_username', 'db_dev_password', 'db_dev_dbname', 'db_dev_zone',
    'db_production_username', 'db_production_password', 'db_production_dbname', 'db_production_zone'];

for (var field of passport_fields) {
    if (!(field in passport)) {
        console.log(red(`passport.json missing field ${field}`));
        process.exit(-1);
    }
}

passport.db_dev_uri = `mongodb://${passport.db_dev_username}:${passport.db_dev_password}@` +
    `${passport.db_dev_dbname}-00-00-${passport.db_dev_zone}.mongodb.net:27017,` +
    `${passport.db_dev_dbname}-00-01-${passport.db_dev_zone}.mongodb.net:27017,` +
    `${passport.db_dev_dbname}-00-02-${passport.db_dev_zone}.mongodb.net:27017` +
    `/test?ssl=true&replicaSet=${passport.db_dev_dbname}-0&authSource=admin`;

passport.db_production_uri = `mongodb://${passport.db_production_username}:${passport.db_production_password}@` +
    `${passport.db_production_dbname}-00-00-${passport.db_production_zone}.mongodb.net:27017,` +
    `${passport.db_production_dbname}-00-01-${passport.db_production_zone}.mongodb.net:27017,` +
    `${passport.db_production_dbname}-00-02-${passport.db_production_zone}.mongodb.net:27017` +
    `/test?ssl=true&replicaSet=${passport.db_production_dbname}-0&authSource=admin`;

module.exports = passport;
