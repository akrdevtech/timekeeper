import React from 'react'
import AttendanceCalendar from './components/AttendanceCalendar'
import AttendanceOverallDetails from './components/AttendanceOverallDetails'


function StudentAttendanceDetails() {

    return (
        <>
            <AttendanceCalendar size={60} />
            <AttendanceOverallDetails />
        </>
    )
}

export default StudentAttendanceDetails