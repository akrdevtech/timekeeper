const { types: { MicroserviceError }, codes: { student: { STUDENT_EXIST } } } = require("../../utils/errors");
const { Op } = require("sequelize");
module.exports = (app) => {
    const {
        database: {
            // Op,
            collections: {
                Students
            }
        },
        utils: {
            errors: {
                types: { MicroserviceError },
                codes: { student: { STUDENT_EXIST } }
            }
        }
    } = app

    const getStudentsByEmail = async (email) => {
        const student = await Students.findOne({ where: { email } });
        return student;
    }

    const getStudentsByAdmissionNumber = async (admissionNumber) => {
        const student = await Students.findOne({ where: { admissionNumber } });
        return student;
    }

    const getStudentsById = async (studentId) => {
        const student = await Students.findOne({ where: { id: studentId } });
        return student;
    }

    const createNewStudent = async (createParams) => {
        const student = await Students.create(createParams);
        return student.id
    }

    const getAllStudentsByFilter = async (filters) => {
        const { page, limit, search, course, admission, graduation, presence } = filters;
        const offset = page * limit;
        const query = { [Op.and]: [] }
        if (search) {
            query[Op.and].push({
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${search}%`
                        }
                    },
                    {
                        email: {
                            [Op.like]: `%${search}%`
                        }
                    }
                ]
            })
        }
        if (course != null) {
            query[Op.and].push({ course: { [Op.in]: [course] } });
        }
        if (admission != null) {
            query[Op.and].push({ isActive: admission === 'active' })
        }
        if (graduation != null) {
            query[Op.and].push({ hasGraduated: graduation === 'completed' })
        }
        if (presence != null) {
            query[Op.and].push({ isPresent: presence === 'present' })
        }
        const { count, rows } = await Students.findAndCountAll({
            where: query,
            offset,
            limit,
        });
        return { count, rows };

    }

    const markStudentPresent = async (studentId) => {
        return await Students.update({ isPresent: true }, {
            where: {
                id: studentId
            }
        });
    }

    const markStudentAbsent = async (studentId) => {
        return await Students.update({ isPresent: false }, {
            where: {
                id: studentId
            }
        });
    }

    return {
        createNewStudent,
        getStudentsById,
        getStudentsByEmail,
        getStudentsByAdmissionNumber,
        getAllStudentsByFilter,
        markStudentPresent,
        markStudentAbsent,
    }
}
