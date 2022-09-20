import React from 'react'
import { Grid, Avatar, Typography, IconButton, useTheme, Badge } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import brandLogo from '../../../../../../assets/images/brand/logo_white.png'

const StudentProfileHeader = (props) => {
    const theme = useTheme();
    const { selectedStudentInfo } = props;
    const name = selectedStudentInfo ? selectedStudentInfo.name : "RPTC";
    const admissionNumber = selectedStudentInfo ? selectedStudentInfo.courseInfo.admissionNumber : "CENTRE FOR LANGUAGE STUDIES";
    const course = selectedStudentInfo ? selectedStudentInfo.courseInfo.course : "Powered by: AceCodeWiz";
    const profilePic = selectedStudentInfo ? selectedStudentInfo.profilePic : brandLogo;
    return (
        <Grid container direction="row">
            <Grid item xs={12} lg={10}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12} lg={2}>
                        <Badge overlap="circular" variant="dot" color={selectedStudentInfo && selectedStudentInfo.isPresent ? "success" : "error"}>
                            <Avatar sx={{ width: 80, height: 80, backgroundColor: theme.palette.secondary.light }} src={profilePic} color="secondary">
                                <Typography variant='h4'><b>{name[0]}</b></Typography>
                            </Avatar>
                        </Badge>
                    </Grid>
                    <Grid item xs={12} lg={9} sx={{ marginLeft: 1 }}>
                        <Typography variant="h6" component="p"><b>{name}</b></Typography>
                        <Typography variant="caption" component="p" color="textSecondary"><b>{admissionNumber}</b></Typography>
                        <Typography variant="caption" component="p" color="textSecondary"><b>{course}</b></Typography>
                    </Grid>
                </Grid>
            </Grid>
            {selectedStudentInfo && (
                <Grid item xs={12} lg={2}>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={12} lg={6}>
                            <IconButton aria-label="logout">
                                {selectedStudentInfo.isPresent ? <LogoutIcon /> : <LoginIcon />}
                            </IconButton>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <IconButton aria-label="addtime">
                                <AlarmAddIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            )}

        </Grid >
    )
}

export default StudentProfileHeader