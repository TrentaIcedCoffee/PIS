var util = {};

util.getTime = function() {
    var date = new Date();
    var year = date.getFullYear();
    year = (year < 10 ? '0' : '') + year;
    var month = date.getMonth();
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
util.solidFields = function(object) {
    var objectSolidFields = {};
    for (var index in object) {
        if (object[index] !== null && object[index] !== undefined) {
            objectSolidFields[index] = object[index];
        }
    }
    return objectSolidFields;
};

module.exports = util;
