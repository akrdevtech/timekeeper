import React from 'react'
import { Paper, Typography, useTheme } from '@mui/material'

const CourseDetailsEnrollmentsInfo = (props) => {
    const { selectedCourseInfo } = props;
    const theme = useTheme();

    if (!selectedCourseInfo) {
        return <></>
    }
    const {
        studentsAttending,
        studentsGraduated
    } = selectedCourseInfo

    return (
        <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", marginTop: 2, borderRadius: 2, padding: 1 }} >
            <Typography variant='body1' color="textSecondary" sx={{ paddingBottom: 1 }}><b>Enrollments</b></Typography>
            <table style={{ color: theme.palette.text.secondary }}>
                <tbody>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary">Attending</Typography></td>
                        <td>: </td>
                        <td><Typography variant='body2' color="textSecondary">{studentsAttending}</Typography></td>
                    </tr>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary">Graduated</Typography></td>
                        <td>: </td>
                        <td><Typography variant='body2' color="textSecondary">{studentsGraduated}</Typography></td>
                    </tr>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary">All Time</Typography></td>
                        <td>: </td>
                        <td><Typography variant='body2' color="textSecondary">{Number(studentsAttending)+Number(studentsGraduated)}</Typography></td>
                    </tr>
                </tbody>
            </table>
        </Paper>
    )
}

export default CourseDetailsEnrollmentsInfo