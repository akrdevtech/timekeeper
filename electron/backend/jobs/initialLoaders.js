const loggerUtil = require("../utils/logger")
const dateUtil = require("../utils/dateHelpers")();
const attendanceServices = require('../controllers/attendance/services');
const studentServices = require('../controllers/students/services');

module.exports = (app) => {
    const logger = loggerUtil("Initial Loader");
    const attendanceRepo = attendanceServices(app);
    const studentRepo = studentServices(app);
    
    const markMissingAttendance = async (today = new Date()) => {
        logger.info("markMissingAttendance", "Loading function", "Marking clock out for missing attendance records");
        const { start } = dateUtil.getStartAndEndOfDay(today);
        const missingStudentClockOutsSet = new Set();
        const missingAttendanceClockOuts = await attendanceRepo.getClockOutMissingRecords(start);
        await Promise.all(missingAttendanceClockOuts.map(async record => {
            missingStudentClockOutsSet.add(record.studentId);
            const { end } = dateUtil.getStartAndEndOfDay(new Date(record.clockedInAt));
            await attendanceRepo.updateAttendanceTimingsById(record.id, record.clockedInAt, end);
        }));

        const missingStudentClockOuts = Array.from(missingStudentClockOutsSet);
        logger.info(
            "markMissingAttendance", 
            "Loading function", 
            `Found ${missingStudentClockOuts.length} Student records and ${missingAttendanceClockOuts.length} Attendance records`
            );


        await Promise.all(missingStudentClockOuts.map(async studentId => {
            const studentIsPresent = await attendanceRepo.checkStudentIsPresent(studentId, new Date());
            if (!studentIsPresent) {
                await studentRepo.markStudentAbsent(studentId);
                return true
            }
            return false;
        }));
    }

    return {
        markMissingAttendance
    }
}