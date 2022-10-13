const Joi = require("joi");

const getEnrollmentsForCourse = {
    query: Joi.object({
        courseId: Joi.string().required(),
        from: Joi.string(),
        to: Joi.string(),
    })
}

module.exports = {
    getEnrollmentsForCourse,
};