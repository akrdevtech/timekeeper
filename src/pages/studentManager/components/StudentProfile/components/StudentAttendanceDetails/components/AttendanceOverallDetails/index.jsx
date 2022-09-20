import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'

const AttendanceOverallDetails = () => {
    const totalAttendance = 123;
    const thisMonth = 12;
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
                    <Typography color="textSecondary" align='start'>
                        <table sx={{ width: "100%" }}>
                            <tbody sx={{ width: "100%" }}>
                                <tr><td><b>Day</b></td><td> : </td><td>Jan 12, 2022</td></tr>
                                <tr><td><b>In</b></td><td> : </td><td>08:46 am</td></tr>
                                <tr><td><b>Out</b></td><td> : </td><td>03:30 pm</td></tr>
                            </tbody>
                        </table>
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", borderRadius: 2, padding: 2, textAlign: 'center' }} >
                    <Typography variant='body1' color="textSecondary"><b>This Month : </b>{thisMonth}</Typography>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default AttendanceOverallDetails