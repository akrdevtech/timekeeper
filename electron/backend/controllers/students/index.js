const express = require('express');
const { validatorMiddleware } = require('../../utils/validator');
const studentValidators = require('./validators');
const studentControllers = require('./controllers');
const router = express.Router();

module.exports = (app) => {
    const student = studentControllers(app);

    router.get('/', [
        validatorMiddleware(studentValidators.getAllStudentsByFilter),
        student.getAllStudentsByFilter,
    ]);

    router.get('/autogen-admno', [
        validatorMiddleware(studentValidators.autogenerateAdmissionNumber),
        student.autogenerateAdmissionNumber,
    ]);

    router.post('/', [
        validatorMiddleware(studentValidators.createNewStudent),
        student.createNewStudent,
    ]);
    router.delete('/:studentId', [
        validatorMiddleware(studentValidators.deleteStudent),
        student.deleteStudent,
    ]);
    router.post('/:studentId/clock-in', [
        validatorMiddleware(studentValidators.studentClockIn),
        student.studentClockIn,
    ]);
    router.patch('/:studentId/clock-out', [
        validatorMiddleware(studentValidators.studentClockOut),
        student.studentClockOut,
    ]);
    router.patch('/:studentId/activate', [
        validatorMiddleware(studentValidators.activateStudent),
        student.activateStudent,
    ]);
    router.patch('/:studentId/deactivate', [
        validatorMiddleware(studentValidators.deactivateStudent),
        student.deactivateStudent,
    ]);
    router.patch('/:studentId/graduate', [
        validatorMiddleware(studentValidators.studentGraduateCourse),
        student.studentGraduateCourse,
    ]);
    router.patch('/:studentId/pursue', [
        validatorMiddleware(studentValidators.studentPursueCourse),
        student.studentPursueCourse,
    ]);
    router.get('/:studentId/attendance', [
        validatorMiddleware(studentValidators.attendanceOverview),
        student.getAttendanceOverview,
    ]);
    return router;
};



