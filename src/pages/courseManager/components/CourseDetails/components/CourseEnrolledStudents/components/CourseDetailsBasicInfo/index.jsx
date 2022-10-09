import React from 'react'
import { Paper, Typography, useTheme } from '@mui/material'

const CourseDetailsBasicInfo = (props) => {
    const { selectedCourseInfo } = props;
    const theme = useTheme();

    if (!selectedCourseInfo) {
        return <></>
    }
    const {
        fee,
        duration,
        minCredits,
        totalCredits,
    } = selectedCourseInfo

    return (
        <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", marginTop: 2, borderRadius: 2, padding: 1 }} >
            <Typography variant='body1' color="textSecondary" sx={{ paddingBottom: 1 }}><b>Basic Info</b></Typography>
            <table style={{ color: theme.palette.text.secondary }}>
                <tbody>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary">Fee</Typography></td>
                        <td>: </td>
                        <td><Typography variant='body2' color="textSecondary">₹ {fee}</Typography></td>
                    </tr>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary">Duration</Typography></td>
                        <td>: </td>
                        <td><Typography variant='body2' color="textSecondary">{duration} Days</Typography></td>
                    </tr>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary">Minimum Credits</Typography></td>
                        <td>: </td>
                        <td><Typography variant='body2' color="textSecondary">{minCredits}</Typography></td>
                    </tr>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary">Total Credits</Typography></td>
                        <td>: </td>
                        <td><Typography variant='body2' color="textSecondary">{totalCredits}</Typography></td>
                    </tr>
                </tbody>
            </table>
        </Paper>
    )
}

export default CourseDetailsBasicInfo