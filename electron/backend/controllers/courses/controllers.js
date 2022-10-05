const CourseEnums = require('./enums');
const courseServices = require('./services');

module.exports = (app) => {
    const course = courseServices(app);

    const getAllCoursesByFilter = async (req, res, next) => {
        const { page, limit, search, status } = req.query;
        const courseList = await course.getAllCoursesByFilter({ page, limit, search, status });
        res.locals.data = courseList;
        next();
    }

    const createNewCourse = async (req, res, next) => {
        console.log("creating course");
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
            next(error)
        }
    }


    return {
        createNewCourse,
        getAllCoursesByFilter,
    }
}


