/**
 * Custom error for authentication
 * @class
 * @author Akhil Krishnan R
 */
const AppError = require('./AppError');

class AuthenticationError extends AppError {
  constructor(code, message, status) {
    super(code || 'UNAUTHORIZED', message || '', status || 401);
    this.name = this.constructor.name;
  }
}

module.exports = AuthenticationError;