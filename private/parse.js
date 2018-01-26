'use strict'

module.exports = function() {
    var ret = [];
    ret.push(process.argv.length);
    for (var i = 2; i < process.argv.length; i++) {
        ret.push(process.argv[i]);
    }
    return ret;
};
