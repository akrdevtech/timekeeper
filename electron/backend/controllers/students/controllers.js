const studentServices = require('./services');
const attendanceServices = require('../attendance/services');

module.exports = (app) => {

    const {
        utils: {
            logger,
            errors: {
                types: { MicroserviceError },
                codes: {
                    student: {
                        STUDENT_EXIST,
                        STUDENT_INACTIVE,
                        STUDENT_DOES_NOT_EXIST,
                        STUDENT_IS_PRESENT,
                        STUDENT_IS_ABSENT,
                        FAILED_CLOCK_IN
                    }
                }
            }
        }
    } = app

    const students = studentServices(app);
    const attendanceService = attendanceServices(app);

    const getAllStudentsByFilter = async (req, res, next) => {
        const { page, limit, search, course, admission, graduation, presence } = req.query;
        const id = await students.getAllStudentsByFilter({ page, limit, search, course, admission, graduation, presence });
        res.locals.data = id;
        next();
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
            const { studentId } = req.params;

            const student = await students.getStudentsById(studentId);
            if (!student) {
                return next(new MicroserviceError(STUDENT_DOES_NOT_EXIST))
            }
            if (!student.isActive) {
                return next(new MicroserviceError(STUDENT_INACTIVE))
            }
            const studentIsPresent = await attendanceService.checkStudentIsPresent(studentId, new Date(clockedInAt));
            if (studentIsPresent) {
                await students.markStudentPresent(studentId);
                const studentData = await students.getStudentsById(studentId);
                res.locals.data = studentData;
                return next();
            }

            const createParams = {
                studentId,
                clockedInAt: new Date(clockedInAt)
            }
            const id = await attendanceService.createNewAttendance(createParams);

            if (!id) {
                return next(new MicroserviceError(FAILED_CLOCK_IN))
            }
            await students.markStudentPresent(studentId);
            const studentData = await students.getStudentsById(studentId);
            res.locals.data = studentData;
            next();
        } catch (error) {
            next(error)
        }
    }

    const studentClockOut = async (req, res, next) => {
        try {
            const { clockedOutAt } = req.body;
            const { studentId } = req.params;

            const student = await students.getStudentsById(studentId);
            if (!student) {
                return next(new MicroserviceError(STUDENT_DOES_NOT_EXIST))
            }
            if (!student.isActive) {
                return next(new MicroserviceError(STUDENT_INACTIVE))
            }
            const currentAttendance = await attendanceService.checkStudentIsPresent(studentId, new Date(clockedOutAt));
            if (!currentAttendance) {
                return next(new MicroserviceError(STUDENT_IS_ABSENT));
            }

            await attendanceService.updateClockedOut(currentAttendance.id, new Date(clockedOutAt));

            await students.markStudentAbsent(studentId);
            const studentData = await students.getStudentsById(studentId);
            res.locals.data = studentData;
            next();
        } catch (error) {
            next(error)
        }
    }

    const activateStudent = async (req, res, next) => {
        try {
            const { studentId } = req.params;

            const student = await students.getStudentsById(studentId);
            if (!student) {
                return next(new MicroserviceError(STUDENT_DOES_NOT_EXIST))
            }
            await students.activateStudent(studentId);
            res.locals.data = student.id;
            next();
        } catch (error) {
            next(error)
        }
    }

    const deactivateStudent = async (req, res, next) => {
        try {
            const { studentId } = req.params;

            const student = await students.getStudentsById(studentId);
            if (!student) {
                return next(new MicroserviceError(STUDENT_DOES_NOT_EXIST))
            }
            await students.deactivateStudent(studentId);
            res.locals.data = student.id;
            next();
        } catch (error) {
            next(error)
        }
    }

    const getAttendanceOverview = async (req, res, next) => {
        try {
            const { studentId } = req.params;
            const { month, year } = req.query;
            const student = await students.getStudentsById(studentId);
            if (!student) {
                return next(new MicroserviceError(STUDENT_DOES_NOT_EXIST))
            }
            const overview = await attendanceService.getAttendanceOverview(studentId, month, year);
            res.locals.data = overview;
            next();
        } catch (error) {
            next(error)
        }
    }
    return {
        createNewStudent,
        studentClockIn,
        studentClockOut,
        getAllStudentsByFilter,
        activateStudent,
        deactivateStudent,
        getAttendanceOverview
    }
}


