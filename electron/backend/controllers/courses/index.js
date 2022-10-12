const express = require('express');
const { validatorMiddleware } = require('../../utils/validator');
const courseValidators = require('./validators');
const courseControllers = require('./controllers');
const router = express.Router();

module.exports = (app) => {
    const course = courseControllers(app);

    router.get('/', [
        validatorMiddleware(courseValidators.getAllCoursesByFilter),
        course.getAllCoursesByFilter,
    ]);

    router.get('/active-list',[
        course.getAllActiveCoursesList,
    ]);

    router.get('/autogen',[
        course.getNextCourseIndex,
    ]);

    router.post('/', [
        validatorMiddleware(courseValidators.createNewCourse),
        course.createNewCourse,
    ]);

    return router;
};



