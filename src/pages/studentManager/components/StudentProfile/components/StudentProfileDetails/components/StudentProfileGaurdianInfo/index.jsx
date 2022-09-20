import React from 'react'
import {  Paper, Typography } from '@mui/material'

const StudentProfileGaurdianInfo = (props) => {
    const { gaurdianInfo: {
        nameOfGaurdian,
        phoneOfGaurdian,
    } } = props
    return (
        <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", marginTop: 2, borderRadius: 2, padding: 1 }} >
            <Typography variant='body1' color="textSecondary" sx={{ paddingBottom: 1 }}><b>Gaurdian</b></Typography>
            <table>
                <tbody>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary">Name</Typography></td>
                        <td>:</td>
                        <td><Typography variant='body2' color="textSecondary"><b>{nameOfGaurdian}</b></Typography></td>
                    </tr>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary">Phone</Typography></td>
                        <td>:</td>
                        <td><Typography variant='body2' color="textSecondary"><b>{phoneOfGaurdian}</b></Typography></td>
                    </tr>
                </tbody>
            </table>
        </Paper>
    )
}

export default StudentProfileGaurdianInfo