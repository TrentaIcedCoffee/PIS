var fs = require('fs');
var config = require(`${rootUri}/private/config`);
var util = require(`${rootUri}/private/util`);

var logger = {
    'logUri': config.logUri,
    'log': function(...params) {
        var message;
        if (params.length == 1) {
            message = params[0];
        } else if (params.length == 5) {
            message = params.join(';');
        } else {
            throw new Error('debug'); // TODO
        }

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
        });
    }
};

logger.log('ip', util.getTime(), 'uri', 'method', 'status');

module.exports = logger;