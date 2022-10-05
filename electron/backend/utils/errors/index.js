/**
 * Error handler helpers
 * @author Akhil Krishnan R
 */
const AppError = require('./types/AppError');
const MicroserviceError = require('./types/MicroserviceError');
const AuthenticationError = require('./types/AuthenticationError');
const RequestValidationError = require('./types/RequestValidationError');
const DbError = require('./types/DbError');
const errorConfigs = require('../../configs').errors;

/**
 * Retrieve error message by code
 * @param  {string} errorCode
 */
module.exports = {
  getErrorMessage: (errorCode) => {
    const message = errorConfigs.ErrorMessages[errorCode];
    if (!message) {
      return errorConfigs.ErrorMessages[errorConfigs.ErrorCodes.application.SYSTEM_ERROR];
    }
    return message;
  },

  types: {
    AppError,
    AuthenticationError,
    MicroserviceError,
    RequestValidationError,
    DbError,
  },

  codes: errorConfigs.ErrorCodes,
  messages: errorConfigs.ErrorMessages,

};