const express = require('express');
const { validatorMiddleware } = require('../../utils/validator');
const attendanceValidators = require('./validators');
const attendanceControllers = require('./controllers');
const router = express.Router();

module.exports = (app) => {
    const attendance = attendanceControllers(app);

    router.get('/', function (req, res, next) {
        res.send('getting all students');
    });

    router.post('/', [
        validatorMiddleware(attendanceValidators.createNewAttendance),
        attendance.createNewAttendance,
    ]);

    router.patch('/:attendanceId', [
        validatorMiddleware(attendanceValidators.updateAttendance),
        attendance.updateAttendance,
    ]);

    router.delete('/:attendanceId', [
        validatorMiddleware(attendanceValidators.deleteAttendance),
        attendance.deleteAttendance,
    ]);

    return router;
};



