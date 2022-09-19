import React from 'react'
import {  Paper, Typography } from '@mui/material'
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import dateHelpers from '../../../../../../../../utils/dateHelpers'
import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

const getGenderIcon = (thisGender) => {
    switch (thisGender) {
        case "male":return <MaleIcon fontSize="small" />
        case "female":return <FemaleIcon fontSize="small" />
        default: return <TransgenderIcon fontSize="small" />
    }
}
const StudentProfileBasicInfo = (props) => {
    const {
        basicInfo: {
            gender,
            dateOfBirth,
            occupation,
        }
    } = props;

    const dob = dateHelpers.formatAsPartDate(new Date(dateOfBirth));

    return (
        <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", marginTop: 2, borderRadius: 2, padding: 1 }} >
            <table>
                <tbody>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary">{getGenderIcon(gender)}</Typography></td>
                    </tr>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary"><CakeOutlinedIcon fontSize="small" /></Typography></td>
                        <td>:</td>
                        <td><Typography variant='body2' color="textSecondary"><b>{dob}</b></Typography></td>
                    </tr>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary"><WorkOutlineOutlinedIcon fontSize="small" /></Typography></td>
                        <td>:</td>
                        <td><Typography variant='body2' color="textSecondary"><b>{occupation}</b></Typography></td>
                    </tr>
                </tbody>
            </table>
        </Paper>
    )
}

export default StudentProfileBasicInfo