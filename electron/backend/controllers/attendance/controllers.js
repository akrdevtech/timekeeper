const attendanceServices = require('./services');

module.exports = (app) => {
    const attendance = attendanceServices(app);

    const createNewAttendance = async (req, res, next) => {
        try {
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
            next(error)
        }
    }

    const updateAttendance = async (req, res, next) => {
        try {
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
            next(error)
        }
    }

    const deleteAttendance = async (req, res, next) => {
        try {
            const { attendanceId } = req.params;
            const response = await attendance.deleteAttendanceById(attendanceId);
            res.locals.data = response;
            next();
        } catch (error) {
            next(error)
        }
    }


    return {
        createNewAttendance,
        updateAttendance,
        deleteAttendance
    }
}


