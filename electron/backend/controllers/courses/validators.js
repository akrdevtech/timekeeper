const Joi = require("joi");

const createNewCourse = {
    body: Joi.object({
        courseId: Joi.string().required(),
        courseName: Joi.string().required(),
        duration: Joi.number().required(),
        fee: Joi.number().required(),
        totalCredits: Joi.number().required(),
        minCredits: Joi.number().required(),
        syllabus: Joi.string(),
    }),
}

module.exports = {
    createNewCourse,
};