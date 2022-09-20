const responseHandlerUtil = require('./responseHandler');
const erroreHandlerUtil = require('./errorHandler');
const errorUtil = require('./errors');
const eventLogHandler = require('./eventLogHandler');
const requestHandler = require('./requestHandler');
const dateUtils = require('./dateHelpers');
const logger = require('./logger');

module.exports = {
  eventLogHandler: eventLogHandler(),
  globalReponseHandler: responseHandlerUtil(),
  globalRequestInterceptor: requestHandler(),
  globalErrorHandler: erroreHandlerUtil(),
  errors: errorUtil,
  dateUtils: dateUtils,
  logger: logger(),
}
