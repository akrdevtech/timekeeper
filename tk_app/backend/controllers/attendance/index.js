const express = require('express');
const { validatorMiddleware } = require('../../utils/validator');
const studentValidators = require('./validators');
const studentControllers = require('./controllers');
const router = express.Router();

module.exports = (app) => {
    const student = studentControllers(app);

    router.get('/', function (req, res, next) {
        res.send('getting all students');
    });

    router.post('/', [
        validatorMiddleware(studentValidators.createNewStudent),
        // student.createNewStudent,
    ]);

    return router;
};



