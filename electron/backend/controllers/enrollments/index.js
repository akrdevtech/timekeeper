const express = require('express');
const { validatorMiddleware } = require('../../utils/validator');
const enrollmentsValidators = require('./validators');
const enrollmentsControllers = require('./controllers');
const router = express.Router();

module.exports = (app) => {
    const enrollments = enrollmentsControllers(app);

    router.get('/', [
        validatorMiddleware(enrollmentsValidators.getEnrollmentsForCourse),
        enrollments.getEnrollmentsForCourse,
    ]);

    return router;
};



