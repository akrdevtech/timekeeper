const Joi = require("joi");

const basicInfoSchema = Joi.object({
    name: Joi.string().min(3).required(),
    gender: Joi.string().min(3).required(),
    dateOfBirth: Joi.date().required(),
    occupation: Joi.string(),
});

const contactInfoSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    phone: Joi.string().min(10).pattern(/^[0-9]+$/).required(),
    addressLine1: Joi.string().min(10).required(),
    addressLine2: Joi.string().optional(),
    pin: Joi.number().min(5),
});

const courseInfoSchema = Joi.object({
    course: Joi.string().min(3).required(),
    dateOfAdmission: Joi.date().required(),
});

const gaurdianInfoSchema = Joi.object({
    nameOfGaurdian: Joi.string().min(3).required(),
    phoneOfGaurdian: Joi.string().min(3),
});

const createNewStudent = {
    body: Joi.object({
        name: Joi.string().min(3).required(),
        gender: Joi.string().min(3).required(),
        dateOfBirth: Joi.date().required(),
        occupation: Joi.string(),
        contactInfo: contactInfoSchema,
        courseInfo: courseInfoSchema,
        gaurdianInfoSchema: gaurdianInfoSchema
    }),
}

module.exports = {
    createNewStudent
};