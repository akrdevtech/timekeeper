const express = require('express');
const { validatorMiddleware } = require('../../utils/validator');
const syllabusValidators = require('./validators');
const syllabusControllers = require('./controllers');
const router = express.Router();

module.exports = (app) => {
    const syllabus = syllabusControllers(app);

    router.get('/', [
        validatorMiddleware(syllabusValidators.getSyllabusForCourse),
        syllabus.getSyllabusForCourse,
    ]);

    return router;
};



