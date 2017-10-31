var exceptions = {};

class DebugException extends Error {
    constructor() {
        super('This exception should never be thrown, if you see this, please contact with author');
        this.name = 'DebugException';
    }
}
exceptions.DebugException = DebugException;

module.exports = exceptions;
