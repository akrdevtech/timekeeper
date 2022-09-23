import { Grid, Paper, Typography, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import { StudentContext } from '../../../../../../Store';
import dateHelpers from '../../../../../../../../utils/dateHelpers';

const AttendanceOverallDetails = () => {
    const theme = useTheme();
    const [state] = useContext(StudentContext);
    const { selectedStudentAttendance: {
        selectedDate,
        clockedIn,
        clockedOut,
        totalAttendance,
        thisMonthAttendance,
    }, } = state;

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ marginTop: 1 }} spacing={2}>
            <Grid item xs={6}>
                <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", borderRadius: 2, padding: 2, textAlign: 'center' }} >
                    <Typography variant='body1' color="textSecondary" sx={{ paddingBottom: 1 }}><b>Total Attendance</b></Typography>
                    <Typography color="textSecondary" sx={{ fontSize: 60, fontWeight: 600, letterSpacing: 2 }}>{totalAttendance}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", borderRadius: 2, padding: 2, textAlign: 'center' }} >
                    <Typography variant='body1' color="textSecondary" sx={{ paddingBottom: 1 }}><b>Log Timings</b></Typography>
                    <table style={{ width: "100%", textAlign: 'left', color: theme.palette.text.secondary }}>
                        <tbody>
                            <tr><td><b>Day</b></td><td> : </td><td>{selectedDate ? dateHelpers.formatAsPartDate(selectedDate) : 'MM dd,YYYY'}</td></tr>
                            <tr><td><b>In</b></td><td> : </td><td>{clockedIn?dateHelpers.formatLocaleTimeString(clockedIn):null}</td></tr>
                            <tr><td><b>Out</b></td><td> : </td><td>{clockedOut?dateHelpers.formatLocaleTimeString(clockedOut):null}</td></tr>
                        </tbody>
                    </table>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", borderRadius: 2, padding: 2, textAlign: 'center' }} >
                    <Typography variant='body1' color="textSecondary"><b>This Month : </b>{thisMonthAttendance}</Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default AttendanceOverallDetails