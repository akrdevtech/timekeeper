import Joi from "joi";

const basicInfoSchema = Joi.object({
    courseId: Joi.string().min(3).required(),
    courseName: Joi.string().min(3).required(),
    duration: Joi.number(),
    fee: Joi.number(),
    totalCredits: Joi.number(),
    minCredits: Joi.number(),
    syllabus: Joi.string().optional(),
});

const AddStudentWizardSchemas = {
    basicInfoSchema,
}

export default AddStudentWizardSchemas