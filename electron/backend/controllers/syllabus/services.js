const { Op } = require("sequelize");

module.exports = (app) => {
    const {
        database: {
            collections: {
                Syllabus
            }
        },
        utils: {
            errors: {
                types: { MicroserviceError, DbError },
                codes: { course: { COURSE_EXIST } }
            }
        }
    } = app

    const getSyllabusForCourse = async (courseId) => {
        return await Syllabus.findOne({ where: { courseId } });
    }

    const insertSyllabus = async (createParams) => {
        return await Syllabus.upsert(createParams);
    };


    return {
        insertSyllabus,
        getSyllabusForCourse,
    }
}
