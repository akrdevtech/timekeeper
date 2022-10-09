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

    const updateAttendanceTimingsById = async (id, clockedInAt = new Date(), clockedOutAt = new Date()) => {
        return await Attendances.update({ clockedOutAt: new Date(clockedOutAt), clockedInAt: new Date(clockedInAt) }, {
            where: {
                id: id
            }
        });
    }

    const getAttendanceOverview = async (studentId, month, year) => {
        const total = await Attendances.count({ where: { studentId } });
        const startOfMonth = new Date(year, month, 1, 0, 0, 0, 0);
        const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0, 23, 59, 59);
        const thisMonth = await Attendances.findAll({
            where: {
                [Op.and]: [
                    { studentId },
                    {
                        clockedInAt: {
                            [Op.between]: [startOfMonth, endOfMonth]
                        }
                    }
                ]
            }
        })

        return {
            total: total || 0,
            thisMonth,
        }
    }

    const getAttendanceById = async (attendanceId) => {
        const attendanceData = await Attendances.findByPk(attendanceId);
        return attendanceData;
    }

    const deleteAttendanceById = async (attendanceId) => {
        const attendanceData = await Attendances.destroy({
            where: {
                id: attendanceId
            }
        });
        return attendanceData;
    }

    const deleteAttendanceByStudentId = async (studentId) => {
        const attendanceData = await Attendances.destroy({
            where: {
                studentId
            }
        });
        return attendanceData;
    }

    const updateAttendance = async (attendanceId, updateParams) => {
        return await Attendances.update({
            studentId: updateParams.studentId,
            clockedOutAt: new Date(updateParams.clockedOutAt),
            clockedInAt: new Date(updateParams.clockedInAt)
        }, {
            where: {
                id: attendanceId
            }
        });
    }

    return {
        createNewAttendance,
        checkStudentIsPresent,
        updateClockedOut,
        getClockOutMissingRecords,
        updateAttendanceTimingsById,
        getAttendanceOverview,
        getAttendanceById,
        updateAttendance,
        deleteAttendanceById,
        deleteAttendanceByStudentId,
    }
}
