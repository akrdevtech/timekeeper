const Joi = require("joi");

const getSyllabusForCourse = {
    query: Joi.object({
        courseId: Joi.string().required(),
    })
}

module.exports = {
    getSyllabusForCourse,
};