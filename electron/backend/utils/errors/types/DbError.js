/**
 * Custom error for request param/body/header validation
 * @author Akhil Krishnan R
 */
const AppError = require('./AppError');

class DbError extends AppError {
  constructor(code, messages, status) {
    super(code || 'DB_ERROR', messages || '', status || 400);
    this.name = this.constructor.name;
  }
}

module.exports = DbError;