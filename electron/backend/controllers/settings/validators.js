const Joi = require("joi");

const upsertSettings = {
    params: Joi.object({
        profile: Joi.string(),
    })
}

const getSettingsForProfile = {
    params: Joi.object({
        profile: Joi.string(),
    })
}

module.exports = {
    upsertSettings,
    getSettingsForProfile,
};