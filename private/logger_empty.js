/*
    This script is used to empty log, use with care
*/
var path = require('path');
global.rootUri = path.join(__dirname, '..');
var logger = require(`${rootUri}/private/logger`);

logger.empty();
