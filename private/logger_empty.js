var path = require('path');
global.rootUri = path.join(__dirname, '..');
var logger = require(`${rootUri}/private/logger`);

logger.empty();
