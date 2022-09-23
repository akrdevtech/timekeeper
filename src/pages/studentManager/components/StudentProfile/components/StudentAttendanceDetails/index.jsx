import React, { useContext, useEffect } from 'react'
import studentApis from '../../../../../../api/studentServices';
import StudentActions from '../../../../Actions';
import { StudentContext } from '../../../../Store';
import AttendanceCalendar from './components/AttendanceCalendar'
import AttendanceOverallDetails from './components/AttendanceOverallDetails'


function StudentAttendanceDetails() {
    const [state, dispatch] = useContext(StudentContext);
    const {
        selectedStudentInfo,
        selectedStudentAttendance: {
            selectedYear,
            selectedMonth,
            selectedMonthAttendance,
            selectedDate,
            clockedIn,
            clockedOut,
            totalAttendance,
            thisMonthAttendance,
            refreshAttendanceCalendar,
        },
        studentDetailsActiveTab
    } = state;

    const isAttendanceTab = studentDetailsActiveTab === 'attendance';
    useEffect(() => {
        if (isAttendanceTab) {
            studentApis.getMonthAttendanceOverview(selectedStudentInfo.id, selectedYear, selectedMonth).then(({ total, thisMonth }) => {
                dispatch({
                    type: StudentActions.STUDENT_DETAILS.ATTENDANCE_CALENDAR.SET_ATTENDANCE,
                    payload: {
                        selectedMonthAttendance: thisMonth,
                        totalAttendance: total,
                        selectedDate: null,
                        clockedIn: null,
                        clockedOut: null,
                        thisMonthAttendance: thisMonth.length,
                    }
                });
            })
        }
    }, [isAttendanceTab, selectedStudentInfo, selectedYear, selectedMonth, refreshAttendanceCalendar])

    return (
        <>
            <AttendanceCalendar size={60} />
            <AttendanceOverallDetails />
        </>
    )
}

export default StudentAttendanceDetails