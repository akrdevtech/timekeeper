const { Op } = require("sequelize");

module.exports = (app) => {
    const {
        database: {
            collections: {
                Courses
            }
        },
        utils: {
            dateUtils,
            errors: {
                types: { MicroserviceError, DbError },
                codes: { course: { COURSE_EXIST } }
            }
        }
    } = app

    const createNewCourse = async (createParams) => {
        const existingCourse = await getCourseByCourseId(createParams.courseId);
        console.log({ existingCourse, createParams });

        if (existingCourse) {
            throw (new MicroserviceError(COURSE_EXIST));
        }
        try {
            const courses = await Courses.create(createParams);
            return courses.id

        } catch (error) {
            console.log({ error });
            throw new DbError(null, error.message);
        }
    }

    const getCourseByCourseId = async (courseId) => {
        try {
            const courseData = await Courses.findOne({
                where: { courseId }
            });
            return courseData;
        } catch (error) {
            throw new DbError(null, error.message);
        }

    }


    return {
        createNewCourse,
    }
}
