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

const getAllCoursesByFilter = {
    query: Joi.object({
        page: Joi.number().required(),
        limit: Joi.number(),
        search: Joi.string(),
        status: Joi.string(),
    })
}

module.exports = {
    createNewCourse,
    getAllCoursesByFilter,
};