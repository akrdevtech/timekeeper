const studentServices = require('./services');

module.exports = (app) => {

    const {
        utils: {
            dateUtils,
            errors: {
                types: { MicroserviceError },
                codes: {
                    student: {
                        STUDENT_EXIST,
                        STUDENT_INACTIVE,
                        STUDENT_DOES_NOT_EXIST
                    }
                }
            }
        }
    } = app

    const students = studentServices(app);

    const getAllStudentsByFilter = async (req, res, next) => {
        const { page, limit, search, course, admission, graduation, presence } = req.query;
        const id = await students.getAllStudentsByFilter({ page, limit, search, course, admission, graduation, presence });
        res.locals.data = id;
        next();
        // admission: enum active,inactive,all
        // graduation: enum ongoing, completed, all
        // presence: enum present,absent, all

    }

    const createNewStudent = async (req, res, next) => {
        try {
            const reqBody = req.body;
            const createParams = {
                name: reqBody.name,
                gender: reqBody.gender,
                dateOfBirth: reqBody.dateOfBirth,
                occupation: reqBody.occupation,
                email: reqBody.contactInfo.email,
                phone: reqBody.contactInfo.phone,
                addressLine1: reqBody.contactInfo.addressLine1,
                addressLine2: reqBody.contactInfo.addressLine2,
                pin: reqBody.contactInfo.pin,
                course: reqBody.courseInfo.course,
                dateOfAdmission: reqBody.courseInfo.dateOfAdmission,
                admissionNumber: reqBody.courseInfo.admissionNumber,
                nameOfGaurdian: reqBody.gaurdianInfo.nameOfGaurdian,
                phoneOfGaurdian: reqBody.gaurdianInfo.phoneOfGaurdian,
                performanceListening: 0,
                performanceSpeaking: 0,
                performanceReading: 0,
                performanceWriting1: 0,
                performanceWriting2: 0,
            }
            let existingStudent = await students.getStudentsByEmail(createParams.email);
            if (existingStudent) {
                return next(new MicroserviceError(STUDENT_EXIST))
            }
            existingStudent = await students.getStudentsByAdmissionNumber(createParams.admissionNumber);
            if (existingStudent) {
                return next(new MicroserviceError(STUDENT_EXIST))
            }
            const id = await students.createNewStudent(createParams);
            res.locals.data = id;
            next();
        } catch (error) {
            next(error)
        }

    }

    const studentClockIn = async (req, res, next) => {
        try {
            const { clockedInAt } = req.body;
            const { studentId } = req.query;

            const student = await students.getStudentsById(studentId);
            if (!student) {
                return next(new MicroserviceError(STUDENT_DOES_NOT_EXIST))
            }
            if (!student.isActive) {
                return next(new MicroserviceError(STUDENT_INACTIVE))
            }
            const { start, end } = dateUtils.getStartAndEndOfDay(new Date(clockedInAt));


            const createParams = {
                name: reqBody.name,
                gender: reqBody.gender,
                dateOfBirth: reqBody.dateOfBirth,
                occupation: reqBody.occupation,
                email: reqBody.contactInfo.email,
                phone: reqBody.contactInfo.phone,
                addressLine1: reqBody.contactInfo.addressLine1,
                addressLine2: reqBody.contactInfo.addressLine2,
                pin: reqBody.contactInfo.pin,
                course: reqBody.courseInfo.course,
                dateOfAdmission: reqBody.courseInfo.dateOfAdmission,
                nameOfGaurdian: reqBody.gaurdianInfoSchema.nameOfGaurdian,
                phoneOfGaurdian: reqBody.gaurdianInfoSchema.phoneOfGaurdian,
            }
            const id = await students.createNewAttendance(createParams);
            res.locals.data = id;
            next();
        } catch (error) {
            next(error)
        }

    }

    return {
        createNewStudent,
        studentClockIn,
        getAllStudentsByFilter
    }
}


