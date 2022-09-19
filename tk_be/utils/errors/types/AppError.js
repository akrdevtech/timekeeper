/**
 * Generic App errors
 * @author Akhil Krishnan R
 */
const configs = require('../../../configs');

const { errors: { ErrorCodes } } = configs;

class AppError extends Error {
  constructor(code, message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status || 500;
    this.code = code || ErrorCodes.SYSTEM_ERROR;
  }
}

module.exports = AppError;