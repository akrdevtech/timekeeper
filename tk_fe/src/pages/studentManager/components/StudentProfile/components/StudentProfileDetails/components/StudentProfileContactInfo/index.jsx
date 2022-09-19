import React from 'react'
import { Paper, Typography } from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PermPhoneMsgOutlinedIcon from '@mui/icons-material/PermPhoneMsgOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';

const StudentProfileContactInfo = (props) => {
    const { contactInfo } = props;

    if (!contactInfo) {
        return <></>
    }
    const {
        email,
        phone,
        addressLine1,
        addressLine2,
        pin,
    } = contactInfo

    return (
        <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", marginTop: 2, borderRadius: 2, padding: 1 }} >
            <Typography variant='body1' color="textSecondary" sx={{ paddingBottom: 1 }}><b>Contact</b></Typography>
            <table>
                <tbody>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary"><EmailOutlinedIcon fontSize="small" /></Typography></td>
                        <td>:</td>
                        <td><Typography variant='body2' color="textSecondary">{email}</Typography></td>
                    </tr>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary"><PermPhoneMsgOutlinedIcon fontSize="small" /></Typography></td>
                        <td>:</td>
                        <td><Typography variant='body2' color="textSecondary">{phone}</Typography></td>
                    </tr>
                    <tr>
                        <td><Typography variant='body2' color="textSecondary"><CottageOutlinedIcon fontSize="small" /></Typography></td>
                        <td>:</td>
                        <td><Typography variant='body2' color="textSecondary">{`${addressLine1}, ${addressLine2}, ${pin}`}</Typography></td>
                    </tr>
                </tbody>
            </table>
        </Paper>
    )
}

export default StudentProfileContactInfo