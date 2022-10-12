const { Op } = require("sequelize");
const { getDefaultSettings } = require("../../configs/settings");

module.exports = (app) => {
    const {
        database: {
            collections: {
                Settings
            }
        },
        utils: {
            dateUtils,
            errors: {
                types: { MicroserviceError, DbError },
                codes: { course: { COURSE_EXIST } }
            }
        }
    } = app

    const performInitialMigration = async () => {
        console.log("performing migrations");
        const defaultSettings = getDefaultSettings();
        try {
            const res = await Promise.all(defaultSettings.map(async settingsData => {
                try {
                    await Settings.create(settingsData)
                    return `${settingsData.id}:success`;
                } catch (err) {
                    return `${settingsData.id}:failed::${err.message}`;
                }
            }));
            console.log(res);
        } catch (error) {
            console.log("\n\nError occured");
            console.log(error);
        }
    }

    const upsertSettings = async (profile, options) => {
        const settingsData = settingsOptionsToSettingsDTO(profile, options);
        const createResponse = await Promise.all(settingsData.map(async data => {
            await Settings.upsert(data)
            return data;
        }));
        return createResponse;
    }

    const settingsToSettingsOptionsDTO = (settingsData) => {
        const options = {}
        settingsData.map(data => {
            return options[data.key] = data.value;
        })
        return options;
    }

    const settingsOptionsToSettingsDTO = (profile, options) => {
        const data = Object.keys(options).map(key => {
            return {
                id: `${profile}-${key}`,
                profile,
                key,
                value: options[key],
            }
        })
        return data;
    }

    const getSettingsForProfile = async (profile) => {
        try {
            const settings = await Settings.findAll({
                attributes: ['key', 'value'],
                where: { profile: profile || 'default' }
            });
            return settingsToSettingsOptionsDTO(settings);
        } catch (error) {
            console.log("\n\nError occured");
            console.log(error);
        }
    }


    return {
        performInitialMigration,
        getSettingsForProfile,
        settingsToSettingsOptionsDTO,
        settingsOptionsToSettingsDTO,
        upsertSettings,
    }
}
