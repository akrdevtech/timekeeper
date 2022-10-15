const studentServices = require('./services');
const attendanceServices = require('../attendance/services');
const courseServices = require('../courses/services');
const enrollmentsServices = require('../enrollments/services');

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
                    },
                    course: {
                        COURSE_DOES_NOT_EXIST
                    }
                }
            }
        }
    } = app

    const appLogger = logger("Students Controller")

    const students = studentServices(app);
    const attendanceService = attendanceServices(app);
    const courseService = courseServices(app);
    const enrollmentsService = enrollmentsServices(app);

    const getAllStudentsByFilter = async (req, res, next) => {
        try {
            appLogger.success("c5b1198a-d30d-418d-a8a0-82b1cd4015e1", req.txId, "Students get by filter");
            const { page, limit, search, course, admission, graduation, presence } = req.query;
            const id = await students.getAllStudentsByFilter({ page, limit, search, course, admission, graduation, presence });
            res.locals.data = id;
            next();
        } catch (error) {
            appLogger.error("c5b1198a-d30d-418d-a8a0-82b1cd4015e2", req.txId, error.message);
            next(error)
        }
    }

    const createNewStudent = async (req, res, next) => {
        try {
            appLogger.success("c5b1198a-d30d-418d-a8a0-82b1cd4015e3", req.txId, "Students create new");
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
            const selectedCourse = await courseService.getCourseByCourseId(createParams.course);
            if (!selectedCourse) {
                return next(new MicroserviceError(COURSE_DOES_NOT_EXIST))
            }
            const id = await students.createNewStudent(createParams);
            await courseService.enrollStudentToCourse(createParams.course, 1);
            await enrollmentsService.upsertEnrollment(createParams.course, createParams.dateOfAdmission);
            res.locals.data = id;
            next();
        } catch (error) {
            appLogger.error("c5b1198a-d30d-418d-a8a0-82b1cd4015e4", req.txId, error.message);
            next(error)
        }

    }

    const studentClockIn = async (req, res, next) => {
        try {
            appLogger.success("c5b1198a-d30d-418d-a8a0-82b1cd4015e5", req.txId, "Students clock in");

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
            appLogger.error("c5b1198a-d30d-418d-a8a0-82b1cd4015e6", req.txId, error.message);
            next(error)
        }
    }

    const studentClockOut = async (req, res, next) => {
        try {
            appLogger.success("c5b1198a-d30d-418d-a8a0-82b1cd4015e7", req.txId, "Students clock out");
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
            appLogger.error("c5b1198a-d30d-418d-a8a0-82b1cd4015e8", req.txId, error.message);
            next(error)
        }
    }

    const activateStudent = async (req, res, next) => {
        try {
            appLogger.success("c5b1198a-d30d-418d-a8a0-82b1cd4015e9", req.txId, "Students activate");
            const { studentId } = req.params;

            const student = await students.getStudentsById(studentId);
            if (!student) {
                return next(new MicroserviceError(STUDENT_DOES_NOT_EXIST))
            }
            await students.activateStudent(studentId);
            const studentData = await students.getStudentsById(studentId);
            res.locals.data = studentData;
            next();
        } catch (error) {
            appLogger.error("c5b1198a-d30d-418d-a8a0-82b1cd4015f1", req.txId, error.message);
            next(error)
        }
    }

    const deactivateStudent = async (req, res, next) => {
        try {
            appLogger.success("c5b1198a-d30d-418d-a8a0-82b1cd4015f2", req.txId, "Students activate");
            const { studentId } = req.params;

            const student = await students.getStudentsById(studentId);
            if (!student) {
                return next(new MicroserviceError(STUDENT_DOES_NOT_EXIST))
            }
            await students.deactivateStudent(studentId);
            const studentData = await students.getStudentsById(studentId);
            res.locals.data = studentData;
            next();
        } catch (error) {
            appLogger.error("c5b1198a-d30d-418d-a8a0-82b1cd4015f3", req.txId, error.message);
            next(error)
        }
    }

    const getAttendanceOverview = async (req, res, next) => {
        try {
            appLogger.success("c5b1198a-d30d-418d-a8a0-82b1cd4015f4", req.txId, "Students get attendance overview");
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
            appLogger.error("c5b1198a-d30d-418d-a8a0-82b1cd4015f5", req.txId, error.message);
            next(error)
        }
    }

    const studentPursueCourse = async (req, res, next) => {
        try {
            appLogger.success("c5b1198a-d30d-418d-a8a0-82b1cd4015f6", req.txId, "Students pursue course");
            const { studentId } = req.params;

            const student = await students.getStudentsById(studentId);
            if (!student) {
                return next(new MicroserviceError(STUDENT_DOES_NOT_EXIST))
            }
            await students.studentPursueCourse(studentId);
            const studentData = await students.getStudentsById(studentId);
            await courseService.studentPursueCourse(student.course, 1);
            res.locals.data = studentData;
            next();
        } catch (error) {
            appLogger.error("c5b1198a-d30d-418d-a8a0-82b1cd4015f7", req.txId, error.message);
            next(error)
        }
    }

    const studentGraduateCourse = async (req, res, next) => {
        try {
            appLogger.success("c5b1198a-d30d-418d-a8a0-82b1cd4015f8", req.txId, "Students graduate course");
            const { studentId } = req.params;

            const student = await students.getStudentsById(studentId);
            if (!student) {
                return next(new MicroserviceError(STUDENT_DOES_NOT_EXIST))
            }
            await students.studentGraduateCourse(studentId);
            const studentData = await students.getStudentsById(studentId);
            await courseService.studentGraduateCourse(student.course, 1);
            res.locals.data = studentData;
            next();
        } catch (error) {
            appLogger.error("c5b1198a-d30d-418d-a8a0-82b1cd4015f9", req.txId, error.message);
            next(error)
        }
    }

    const deleteStudent = async (req, res, next) => {
        try {
            appLogger.success("c5b1198a-d30d-418d-a8a0-82b1cd4015a1", req.txId, "Students delete");
            const { studentId } = req.params;

            const student = await students.getStudentsById(studentId);
            if (!student) {
                return next(new MicroserviceError(STUDENT_DOES_NOT_EXIST))
            }
            await students.deleteStudent(studentId);
            await courseService.expellStudentFromCourse(student.course, student.hasGraduated, 1);
            await attendanceService.deleteAttendanceByStudentId(studentId);
            res.locals.data = { deleted: true };
            next();
        } catch (error) {
            appLogger.error("c5b1198a-d30d-418d-a8a0-82b1cd4015a2", req.txId, error.message);
            next(error)
        }
    }

    const getWithPaddingZeros = (number) => {
        if (number < 10) return `00${number}`;
        if (number < 100) return `0${number}`;
        return number;
    }
    const autogenerateAdmissionNumber = async (req, res, next) => {
        try {
            appLogger.success("26fce629-eeb0-48a3-a804-ffb696f592b1", req.txId, "Autogenerate Admission Number for Students");
            const {
                query: {
                    courseId,
                    dateOfAdmission,
                }
            } = req;
            const courseInfo = await courseService.getCourseByCourseId(courseId);
            if (!courseInfo) {
                throw (new MicroserviceError(COURSE_DOES_NOT_EXIST));
            }

            const thisDate = new Date(dateOfAdmission);
            const enrollmentsOfCourse = await enrollmentsService.getEnrollmentsForCourse(courseId, thisDate, thisDate);
            const courseCode = getWithPaddingZeros(Number(courseInfo.code));
            const enrollCount = enrollmentsOfCourse.length ?
                getWithPaddingZeros(Number(enrollmentsOfCourse[0].enrolled) + 1) :
                getWithPaddingZeros(1);
            const thisYear = thisDate.getFullYear();
            const thisMonth = thisDate.getMonth();
            const centerCode = 'RPTC';
            res.locals.data = `${centerCode}-${thisYear}${thisMonth > 9 ? thisMonth : `0${thisMonth}`}${courseCode}${enrollCount}`
            next();
        } catch (error) {
            appLogger.error("26fce629-eeb0-48a3-a804-ffb696f592b0", req.txId, error.message);
            next(error)
        }
    }

    return {
        autogenerateAdmissionNumber,
        createNewStudent,
        studentClockIn,
        studentClockOut,
        getAllStudentsByFilter,
        activateStudent,
        deactivateStudent,
        getAttendanceOverview,
        studentGraduateCourse,
        studentPursueCourse,
        deleteStudent,
    }
}


