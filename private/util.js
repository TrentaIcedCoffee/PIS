'use strict'

var util = {};

util.getIp = function(req) {
    return (req.headers["X-Forwarded-For"] ||
            req.headers["x-forwarded-for"] ||
            '').split(',')[0] ||
            req.client.remoteAddress;
};

util.getTime = function() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // months are zero based
    month = (month < 10 ? '0' : '') + month;
    var day = date.getDate();
    day = (day < 10 ? '0' : '') + day;
    var hour = date.getHours();
    hour = (hour < 10 ? '0' : '') + hour;
    var min = date.getMinutes();
    min = (min < 10 ? '0' : '') + min;
    var second = date.getSeconds();
    second = (second < 10 ? '0' : '') + second;

    return Array.of(year, month, day, hour, min, second).join(':');
};

util.getCounter = function() {
    var counter = {
        id: 0,
        getId: function() {
            return "" + (this.id++);
        }
    };
    return counter;
};

// remove all fields with value null or undefined
util.goSolid = function(obj) {
    for (var index in obj) {
        if (obj[index] == null || obj[index] == undefined) {
            delete obj[index];
        }
    }
    return obj;
};

module.exports = util;
