const settingServices = require('./services');

module.exports = (app) => {
    const settings = settingServices(app);
    const {
        utils: {
            logger,
        }
    } = app
    const appLogger = logger("Settings Controller")

    const getSettingsForProfile = async (req, res, next) => {
        try {
            appLogger.success("4ca8741e-0888-4df7-a756-4483158efc56", req.txId, "Getting Settings For Profile")
            const {
                params: {
                    profile
                }
            } = req;
            const settingsOptions = await settings.getSettingsForProfile(profile);
            res.locals.data = settingsOptions;
            next();
        } catch (error) {
            appLogger.error("4ca8741e-0888-4df7-a756-4483158efc59", req.txId, error.message);
            next(error)
        }
    }


    const upsertSettings = async (req, res, next) => {
        try {
            const {
                params: {
                    profile
                },
                body: options,
            } = req;

            appLogger.success("4ca8741e-0888-4df7-a756-4483158efc57", req.txId, "Upserting Settings For Profile");
            const courseCreationId = await settings.upsertSettings(profile, options);
            res.locals.data = courseCreationId;
            next();
        } catch (error) {
            appLogger.error("4ca8741e-0888-4df7-a756-4483158efc58", req.txId, error.message);
            next(error)
        }
    }


    return {
        upsertSettings,
        getSettingsForProfile,
    }
}


