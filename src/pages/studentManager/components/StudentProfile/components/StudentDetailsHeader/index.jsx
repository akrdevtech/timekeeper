import React from 'react'
import { Grid, Avatar, Typography, IconButton, useTheme, Badge, Menu, MenuItem } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import brandLogo from '../../../../../../assets/images/brand/logo_white.png'

const StudentProfileHeader = (props) => {
    const theme = useTheme();
    const { selectedStudentInfo } = props;
    const name = selectedStudentInfo ? selectedStudentInfo.name : "RPTC";
    const admissionNumber = selectedStudentInfo ? selectedStudentInfo.courseInfo.admissionNumber : "CENTRE FOR LANGUAGE STUDIES";
    const course = selectedStudentInfo ? selectedStudentInfo.courseInfo.course : "Powered by: AceCodeWiz";
    const profilePic = selectedStudentInfo ? selectedStudentInfo.profilePic : brandLogo;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleAdditionalMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAdditionalMenuClose = () => {
        setAnchorEl(null);
    };
    const selectAdditionalMenu = (mode) => {
        setAnchorEl(null);
        console.log(mode);
    }

    return (
        <Grid container direction="row">
            <Grid item xs={12} lg={9}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12} lg={2.5}>
                        <Avatar sx={{ width: 80, height: 80, backgroundColor: theme.palette.secondary.light }} src={profilePic} color="secondary">
                            <Typography variant='h4'><b>{name[0]}</b></Typography>
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} lg={9.5} >
                        <Typography variant="h6" component="p"><b>{name}</b></Typography>
                        <Typography variant="caption" component="p" color="textSecondary"><b>{admissionNumber}</b></Typography>
                        <Typography variant="caption" component="p" color="textSecondary"><b>{course}</b></Typography>
                    </Grid>
                </Grid>
            </Grid>
            {selectedStudentInfo && (
                <>
                    <Grid item xs={12} lg={3}>
                        <Grid container direction="row" justifyContent="center" alignItems="center">
                            <Grid item xs={12} lg={4}>
                                <IconButton aria-label="logout" color='primary'>
                                    {selectedStudentInfo.isPresent ? <LogoutIcon /> : <LoginIcon />}
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} lg={4} color='primary'>
                                <IconButton aria-label="addtime" disabled={!selectedStudentInfo.isPresent}>
                                    <AlarmAddIcon />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} lg={4} >
                                <IconButton aria-label="addtime" onClick={handleAdditionalMenuClick}>
                                    <MoreVertIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleAdditionalMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {console.log(selectedStudentInfo)}
                        <MenuItem onClick={() => selectAdditionalMenu("delete")} sx={{ paddingRight: 10 }}>
                            <IconButton aria-label="addtime">
                                <EditIcon />
                            </IconButton>
                            Edit
                        </MenuItem>

                        {selectedStudentInfo.isActive ? (
                            <MenuItem onClick={() => selectAdditionalMenu("deactive")} >
                                <IconButton aria-label="addtime">
                                    <NoAccountsIcon />
                                </IconButton>
                                Deactive
                            </MenuItem>
                        ) : (
                            <MenuItem onClick={() => selectAdditionalMenu("reactive")}>
                                <IconButton aria-label="addtime">
                                    <VerifiedUserIcon />
                                </IconButton>
                                Reactive
                            </MenuItem>
                        )}


                        <MenuItem onClick={() => selectAdditionalMenu("edit")}>
                            <IconButton aria-label="addtime" color='error'>
                                <DeleteIcon />
                            </IconButton>
                            Remove
                        </MenuItem>
                    </Menu>
                </>
            )}
        </Grid >
    )
}

export default StudentProfileHeader