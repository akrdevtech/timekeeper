const { Op } = require("sequelize");

module.exports = (app) => {
    const {
        database: {
            collections: {
                Enrollments
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

    const getEnrollmentsForCourse = async (courseId, fromDate, toDate) => {
        return await Enrollments.findAll(
            {
                where: {
                    [Op.and]: [
                        { courseId },
                        { year: { [Op.gte]: new Date(fromDate).getFullYear() } },
                        { month: { [Op.gte]: new Date(fromDate).getMonth() } },
                        { year: { [Op.lte]: new Date(toDate).getFullYear() } },
                        { month: { [Op.lte]: new Date(toDate).getMonth() } }
                    ]
                }
            }
        );
    }

    const upsertEnrollment = async (courseId, admissionDate = new Date()) => {
        const thisDate = new Date(admissionDate);
        const thisYear = thisDate.getFullYear();
        const thisMonth = thisDate.getMonth();
        const upsertObject = {
            courseId,
            year: thisYear,
            month: thisMonth,
            enrolled: 1
        }
        const existing = await Enrollments.findOne(
            { where: { courseId, month: thisMonth, year: thisYear } }
        );
        if (existing) {
            upsertObject.id = existing.id;
            upsertObject.enrolled = existing.enrolled + 1;
        }
        return await Enrollments.upsert(upsertObject);
    }


    return {
        getEnrollmentsForCourse,
        upsertEnrollment
    }
}
