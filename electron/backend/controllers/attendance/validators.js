const Joi = require("joi");

const createNewAttendance = {
    body: Joi.object({
        studentId: Joi.string().uuid().required(),
        clockedInAt: Joi.date().required(),
        clockedOutAt: Joi.date().required(),
    }),
}

const updateAttendance = {
    body: Joi.object({
        studentId: Joi.string().uuid().required(),
        clockedInAt: Joi.date().required(),
        clockedOutAt: Joi.date().required(),
    }),
    params: Joi.object({
        attendanceId: Joi.string().uuid().required(),
    })
}

const deleteAttendance = {
    params: Joi.object({
        attendanceId: Joi.string().uuid().required(),
    })
}

module.exports = {
    createNewAttendance,
    updateAttendance,
    deleteAttendance,
};