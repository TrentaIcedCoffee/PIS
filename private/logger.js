// TODO: debug on server

/**
    logger maintains a log on server
    logger.log(req, uri, method, data), it logs time, ip, uri, method, data
*/

'use strict'

var fs = require('fs');
var config = require(`${rootUri}/private/config`);
var util = require(`${rootUri}/private/util`);
var exceptions = require(`${rootUri}/private/exceptions`);

var logger = {
    'logUri': config.logUri,
    'log': function(req, method, uri, data) {
        var time = util.getTime();
        var ip = util.getIp(req);
        var dataString = JSON.stringify(data);
        var message = [time, ip, method, uri, dataString].join(';');
        fs.appendFile(config.logUri, message + "\n", function(err) {
            if (err) {
                console.error(err);
            }
        })
    },
    'empty': function() {
        fs.truncate(config.logUri, 0, function(err) {
            if (err) {
                console.error(err);
            }
            console.log('empty success');
        });
    }
};

module.exports = logger;
