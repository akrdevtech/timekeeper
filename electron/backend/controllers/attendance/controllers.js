const attendanceServices = require('./services');

module.exports = (app) => {
    const attendance = attendanceServices(app);
    const {
        utils: {
            logger,
        }
    } = app
    const appLogger = logger("Attendance Controller")

    const createNewAttendance = async (req, res, next) => {
        try {
            appLogger.success("d03f7126-dee5-408c-b251-fd97dc97cb85", req.txId, 'Attendance Create');
            const reqBody = req.body;
            const createParams = {
                studentId: reqBody.studentId,
                clockedInAt: new Date(reqBody.clockedInAt),
                clockedOutAt: new Date(reqBody.clockedOutAt),
            }
            const attendanceId = await attendance.createNewAttendance(createParams);
            res.locals.data = attendanceId;
            next();
        } catch (error) {
            appLogger.error("d03f7126-dee5-408c-b251-fd97dc97cb88", req.txId, error.message);
            next(error)
        }
    }

    const updateAttendance = async (req, res, next) => {
        try {
            appLogger.success("d03f7126-dee5-408c-b251-fd97dc97cb84", req.txId, 'Attendance Update');
            const reqBody = req.body;
            const { attendanceId } = req.params;
            const updateParams = {
                studentId: reqBody.studentId,
                clockedInAt: new Date(reqBody.clockedInAt),
                clockedOutAt: new Date(reqBody.clockedOutAt),
            }
            await attendance.updateAttendance(attendanceId, updateParams);
            const updatedData = await attendance.getAttendanceById(attendanceId);
            res.locals.data = updatedData;
            next();
        } catch (error) {
            appLogger.error("d03f7126-dee5-408c-b251-fd97dc97cb81", req.txId, error.message);
            next(error)
        }
    }

    const deleteAttendance = async (req, res, next) => {
        try {
            appLogger.success("d03f7126-dee5-408c-b251-fd97dc97cb83", req.txId, 'Attendance Delete');
            const { attendanceId } = req.params;
            const response = await attendance.deleteAttendanceById(attendanceId);
            res.locals.data = response;
            next();
        } catch (error) {
            appLogger.error("d03f7126-dee5-408c-b251-fd97dc97cb82", req.txId, error.message);
            next(error)
        }
    }


    return {
        createNewAttendance,
        updateAttendance,
        deleteAttendance
    }
}


