const { types: { MicroserviceError }, codes: { student: { STUDENT_EXIST } } } = require("../../utils/errors");

module.exports = (app) => {
    const {
        database: {
            collections: {
                Attendances
            }
        },
        utils: {
            errors: {
                types: { MicroserviceError },
                codes: { student: { STUDENT_EXIST } }
            }
        }
    } = app
    
    const createNewAttendance = async (createParams) => {
        const attendance = await Attendances.create(createParams);
        return attendance.id
    }

    return {
        createNewAttendance
    }
}
