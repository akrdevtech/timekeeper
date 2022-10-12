const { Op } = require("sequelize");
const CourseEnums = require("./enums");

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

    const enrollStudentToCourse = async (courseId, numberOfStudents) => {
        try {
            const existingCourse = await getCourseByCourseId(courseId);
            const newAttendingCount = Number(existingCourse.studentsAttending) + Number(numberOfStudents);
            const updated = await Courses.update(
                { studentsAttending: newAttendingCount },
                { where: { courseId } }
            )
            return updated;
        } catch (error) {
            console.log({ error });
            throw new DbError(null, error.message);
        }
    }

    const expellStudentFromCourse = async (courseId, hasGraduated, numberOfStudents) => {
        try {
            const existingCourse = await getCourseByCourseId(courseId);
            let newAttendingCount = Number(existingCourse.studentsAttending);
            let newGraduatingCount = Number(existingCourse.studentsGraduated);
            if (hasGraduated) {
                newGraduatingCount = newGraduatingCount - Number(numberOfStudents);
            } else {
                newAttendingCount = newAttendingCount - Number(numberOfStudents);
            }
            const updated = await Courses.update(
                { studentsAttending: newAttendingCount, studentsGraduated: newGraduatingCount },
                { where: { courseId } }
            )
            return updated;
        } catch (error) {
            console.log({ error });
            throw new DbError(null, error.message);
        }
    }

    const studentGraduateCourse = async (courseId, numberOfStudents) => {
        try {
            const existingCourse = await getCourseByCourseId(courseId);
            const newAttendingCount = Number(existingCourse.studentsAttending) - Number(numberOfStudents);
            const newGraduatingCount = Number(existingCourse.studentsGraduated) + Number(numberOfStudents);
            const updated = await Courses.update(
                { studentsAttending: newAttendingCount, studentsGraduated: newGraduatingCount },
                { where: { courseId } }
            )
            return updated;
        } catch (error) {
            console.log({ error });
            throw new DbError(null, error.message);
        }
    }

    const studentPursueCourse = async (courseId, numberOfStudents) => {
        try {
            const existingCourse = await getCourseByCourseId(courseId);
            const newAttendingCount = Number(existingCourse.studentsAttending) + Number(numberOfStudents);
            const newGraduatingCount = Number(existingCourse.studentsGraduated) - Number(numberOfStudents);
            const updated = await Courses.update(
                { studentsAttending: newAttendingCount, studentsGraduated: newGraduatingCount },
                { where: { courseId } }
            )
            return updated;
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

    const getAllActiveCoursesList = async () => {
        const result = await Courses.findAll({
            attributes: ['courseName', 'courseId'],
            where: { status: CourseEnums.CourseStatus.ACTIVE }
        });
        return result;
    }

    const getNextCourseIndex = async () => {
        return Courses.max('code');
    }

    const getAllCoursesByFilter = async (filters) => {
        const { page, limit, search, status } = filters;
        const offset = page * limit;
        const query = { [Op.and]: [] }
        if (search) {
            query[Op.and].push({
                [Op.or]: [
                    {
                        courseId: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        courseName: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            })
        }
        if (status != null) {
            query[Op.and].push({ status: { [Op.in]: [status] } });
        }
        const { count, rows } = await Courses.findAndCountAll({
            where: query,
            offset,
            limit,
        });
        return { count, rows };
    }

    return {
        createNewCourse,
        getAllCoursesByFilter,
        getAllActiveCoursesList,
        getCourseByCourseId,
        enrollStudentToCourse,
        expellStudentFromCourse,
        studentGraduateCourse,
        studentPursueCourse,
        getNextCourseIndex,
    }
}
