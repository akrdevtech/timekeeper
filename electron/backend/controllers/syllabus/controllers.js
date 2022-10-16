const syllabusServices = require('./services');

module.exports = (app) => {
    const syllabus = syllabusServices(app);
    const {
        utils: {
            dateUtils,
            logger,
        }
    } = app
    const appLogger = logger("Syllabus Controller")

    const getSyllabusForCourse = async (req, res, next) => {
        try {
            appLogger.success("c0d24119-7c4e-42f1-b2b5-f6666c497cc2", req.txId, "Getting Syllabus For Course")
            const {
                query: {
                    courseId
                }
            } = req;

            const syllabusData = await syllabus.getSyllabusForCourse(courseId);
            res.locals.data = syllabusData;
            next();
        } catch (error) {
            appLogger.error("38982d43-982c-4797-b6bf-788428354ffd", req.txId, error.message);
            next(error)
        }
    }

    return {
        getSyllabusForCourse
    }
}


