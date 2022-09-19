import React from 'react'
import {  Paper, Typography } from '@mui/material'
import dateHelpers from '../../../../../../../../utils/dateHelpers'


const StudentProfileCourseInfo = (props) => {
    const { courseInfo: {
        course,
        dateOfAdmission,
        // admissionNumber,
    } } = props

    const doa = dateHelpers.formatAsPartDate(new Date(dateOfAdmission));

    return (
        <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", marginTop: 2, borderRadius: 2, padding: 1 }} >
            <Typography variant='body1' color="textSecondary" sx={{ paddingBottom: 1 }}><b>Course</b></Typography>
            <table>
                <tbody>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary">Name</Typography></td>
                        <td>:</td>
                        <td><Typography variant='body2' color="textSecondary"><b>{course}</b></Typography></td>
                    </tr>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary">Date Of Join</Typography></td>
                        <td>:</td>
                        <td><Typography variant='body2' color="textSecondary"><b>{doa}</b></Typography></td>
                    </tr>
                </tbody>
            </table>
        </Paper>
    )
}

export default StudentProfileCourseInfo