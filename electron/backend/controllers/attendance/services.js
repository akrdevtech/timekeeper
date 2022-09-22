const { types: { MicroserviceError }, codes: { student: { STUDENT_EXIST } } } = require("../../utils/errors");
const { Op } = require("sequelize");

module.exports = (app) => {
    const {
        database: {
            collections: {
                Attendances
            }
        },
        utils: {
            dateUtils,
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

    const checkStudentIsPresent = async (studentId, dateOfClockIn) => {
        const { start, end } = dateUtils.getStartAndEndOfDay(new Date(dateOfClockIn));
        const attendance = await Attendances.findOne({
            where: {
                [Op.and]: [
                    { studentId },
                    {
                        clockedInAt: {
                            [Op.between]: [start, end]
                        }
                    }
                ]
            }
        });
        return attendance;
    }

    const updateClockedOut = async (id, clockedOutAt) => {
        return await Attendances.update({ clockedOutAt: new Date(clockedOutAt) }, {
            where: {
                id: id
            }
        });
    }

    const getClockOutMissingRecords = async (date) => {
        return await Attendances.findAll({
            where: {
                [Op.and]: [
                    { clockedInAt: { [Op.lt]: new Date(date) } },
                    { clockedOutAt: null }
                ]
            }
        })
    }

    const updateAttendanceTimingsById = async (id, clockedInAt = new Date(), clockedOutAt = new Date) => {
        return await Attendances.update({ clockedOutAt: new Date(clockedOutAt), clockedInAt: new Date(clockedInAt) }, {
            where: {
                id: id
            }
        });
    }
    return {
        createNewAttendance,
        checkStudentIsPresent,
        updateClockedOut,
        getClockOutMissingRecords,
        updateAttendanceTimingsById,
    }
}
