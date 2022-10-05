const courseServices = require('./services');

module.exports = (app) => {
    const course = courseServices(app);

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
                fee: fee ? parseFloat(fee).toFixed(2) : 0.0,
                totalCredits,
                minCredits,
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
    }
}


