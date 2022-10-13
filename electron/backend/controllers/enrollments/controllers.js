const enrollmentsServices = require('./services');

module.exports = (app) => {
    const enrollments = enrollmentsServices(app);
    const {
        utils: {
            dateUtils,
            logger,
        }
    } = app
    const appLogger = logger("Enrollments Controller")

    const getEnrollmentsForCourse = async (req, res, next) => {
        try {
            appLogger.success("b6012216-d9fa-4af2-9c1f-f34ce16cb2fc", req.txId, "Getting Enrollments For Course")
            const {
                query: {
                    course, from, to
                }
            } = req;
            const today = new Date();
            const fromDate = from ? new Date(from) : dateUtils.getStartOfMonth(today);
            const toDate = from ? new Date(to) : dateUtils.getEndOfMonth(today);

            const enrollmentsOptions = await enrollments.getEnrollmentsForCourse(course, fromDate, toDate);
            res.locals.data = enrollmentsOptions;
            next();
        } catch (error) {
            appLogger.error("55101641-6e95-4e50-89df-178c3040f560", req.txId, error.message);
            next(error)
        }
    }

    return {
        getEnrollmentsForCourse
    }
}


