/**
 * Custom error for services logical errors
 * @author Akhil Krishnan R
 */
const AppError = require('./AppError');

class MicroserviceError extends AppError {
  constructor(code, message, status) {
    super(code || 'MS_ERROR', message || '', status || 422);
    this.name = this.constructor.name;
  }
}

module.exports = MicroserviceError;
