const CourseEnums = require('./enums');
const courseServices = require('./services');

module.exports = (app) => {
    const course = courseServices(app);
    const {
        utils: {
            logger,
        }
    } = app
    const appLogger = logger("Courses Controller")

    const getAllCoursesByFilter = async (req, res, next) => {
        try {
            appLogger.success("18375354-9db2-4786-896c-9471ccd08091", req.txId, "Getting all courses by filter");
            const { page, limit, search, status } = req.query;
            const courseList = await course.getAllCoursesByFilter({ page, limit, search, status });
            res.locals.data = courseList;
            next();
        } catch (error) {
            appLogger.error("4ca8741e-0888-4df7-a756-4483158efc61", req.txId, error.message);
            next(error)
        }
    }

    const getAllActiveCoursesList = async (req, res, next) => {
        try {
            appLogger.success("18375354-9db2-4786-896c-9471ccd08092", req.txId, "Getting all active courses");
            const courseList = await course.getAllActiveCoursesList();
            res.locals.data = courseList;
            next();
        } catch (error) {
            appLogger.error("4ca8741e-0888-4df7-a756-4483158efc62", req.txId, error.message);
            next(error)
        }
    }

    const generateCode = (prefix, index) => {
        if (index < 10) return `${prefix}-00${index}`;
        if (index < 100) return `${prefix}-0${index}`;
        return `${prefix}-${index}`;

    }

    const getNextCourseIndex = async (req, res, next) => {
        try {
            appLogger.success("18375354-9db2-4786-896c-9471ccd08093", req.txId, "Autogenerating course code");
            const nextIndex = await course.getNextCourseIndex();
            res.locals.data = generateCode(`COURSE`, nextIndex + 1);
            next();
        } catch (error) {
            appLogger.error("4ca8741e-0888-4df7-a756-4483158efc63", req.txId, error.message);
            next(error)
        }
    }

    const createNewCourse = async (req, res, next) => {
        appLogger.success("18375354-9db2-4786-896c-9471ccd08094", req.txId, "Creating new course");
        try {
            const {
                courseId, courseName, duration, fee, totalCredits, minCredits, syllabus
            } = req.body;
            const createParams = {
                courseId,
                courseName,
                duration,
                fee,
                totalCredits,
                minCredits,
                status: CourseEnums.CourseStatus.ACTIVE,
                syllabus: syllabus || null,
                studentsAttending: 0,
                studentsGraduated: 0
            }
            const courseCreationId = await course.createNewCourse(createParams);
            res.locals.data = courseCreationId;
            next();
        } catch (error) {
            appLogger.error("4ca8741e-0888-4df7-a756-4483158efc64", req.txId, error.message);
            next(error)
        }
    }


    return {
        getNextCourseIndex,
        createNewCourse,
        getAllCoursesByFilter,
        getAllActiveCoursesList,
    }
}


