const databaseConfigs = require('./dbConfig');
const errorConfigs = require('./errorConfigs');
const commonConfigs = require('./common');

module.exports = {
    database: databaseConfigs,
    errors: errorConfigs,
    common: commonConfigs,
}