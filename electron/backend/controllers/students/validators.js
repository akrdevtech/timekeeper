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
    admissionNumber: Joi.string().min(5).required(),
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
        gaurdianInfo: gaurdianInfoSchema
    }),
}

const studentClockIn = {
    body: Joi.object({
        clockedInAt: Joi.date().required(),
    }),
    params: Joi.object({
        studentId: Joi.string().uuid().required(),
    })
}

const studentClockOut = {
    body: Joi.object({
        clockedOutAt: Joi.date().required(),
    }),
    params: Joi.object({
        studentId: Joi.string().uuid().required(),
    })
}

const activateStudent = {
    params: Joi.object({
        studentId: Joi.string().uuid().required(),
    })
}

const deactivateStudent = {
    params: Joi.object({
        studentId: Joi.string().uuid().required(),
    })
}

module.exports = {
    createNewStudent,
    studentClockIn,
    studentClockOut,
    activateStudent,
    deactivateStudent
};