const express = require('express');
const { validatorMiddleware } = require('../../utils/validator');
const studentValidators = require('./validators');
const studentControllers = require('./controllers');
const router = express.Router();

module.exports = (app) => {
    const student = studentControllers(app);

    router.get('/', [
        student.getAllStudentsByFilter,
    ]);

    router.post('/', [
        validatorMiddleware(studentValidators.createNewStudent),
        student.createNewStudent,
    ]);
    router.post('/:studentId/attendance', [
        validatorMiddleware(studentValidators.studentClockIn),
        student.createNewStudent,
    ]);

    return router;
};



