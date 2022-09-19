/**
 * Custom error for request param/body/header validation
 * @author Akhil Krishnan R
 */
const AppError = require('./AppError');

class RequestValidationError extends AppError {
  constructor(code, messages, status) {
    super(code || 'INVALID_PARAM', messages || '', status || 400);
    this.name = this.constructor.name;
  }
}

module.exports = RequestValidationError;