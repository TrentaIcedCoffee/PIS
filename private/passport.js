'use strict'

var fs = require('fs');
var red = require('./red');
var passport = require('./passport.json');

module.exports = (function() {
    var is_exit = false;
    if (passport.db_production_uri == null
        || passport.db_production_uri == undefined
        || passport.db_production_uri == '') {
        console.log(red('passport.db_production_uri not valid'));
        is_exit = true;
    }
    if (passport.db_dev_uri == null
        || passport.db_dev_uri == undefined
        || passport.db_dev_uri == '') {
        console.log(red('passport.db_dev_uri not valid'));
        is_exit = true;
    }
    if (is_exit) {
        console.log(red('ERR'));
        process.exit(0);
    }

    return passport;
})();
