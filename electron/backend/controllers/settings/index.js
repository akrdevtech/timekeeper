const express = require('express');
const { validatorMiddleware } = require('../../utils/validator');
const settingsValidators = require('./validators');
const settingsControllers = require('./controllers');
const router = express.Router();

module.exports = (app) => {
    const settings = settingsControllers(app);

    router.get('/:profile', [
        validatorMiddleware(settingsValidators.getSettingsForProfile),
        settings.getSettingsForProfile,
    ]);

    router.put('/:profile', [
        validatorMiddleware(settingsValidators.upsertSettings),
        settings.upsertSettings,
    ]);

    return router;
};



