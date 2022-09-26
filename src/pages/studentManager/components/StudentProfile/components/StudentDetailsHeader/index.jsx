import React, { useContext } from 'react'
import { Grid, Avatar, Typography, IconButton, useTheme, Menu, MenuItem, Tooltip, Badge } from '@mui/material'
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import brandLogo from '../../../../../../assets/images/brand/logo_white.png'
import { StudentContext } from '../../../../Store';
import studentApis from '../../../../../../api/studentServices';
import StudentActions from '../../../../Actions';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SchoolIcon from '@mui/icons-material/School';
import HandshakeIcon from '@mui/icons-material/Handshake';

const StudentProfileHeader = (props) => {
    const theme = useTheme();
    const [state, dispatch] = useContext(StudentContext);
    const { selectedStudentInfo } = state;

    const name = selectedStudentInfo ? selectedStudentInfo.name : "RPTCx";
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
        executeAdditionalMenu(mode);
    }

    const handleClockInOut = () => {
        if (selectedStudentInfo.isPresent) {
            studentApis.studentClockOut(selectedStudentInfo.id).then(studentData => {
                const updatedStudent = studentData && studentData.id ? studentData : selectedStudentInfo;
                dispatch({
                    type: StudentActions.STUDENT_DETAILS.CLOCK_OUT,
                    payload: {
                        studentData: updatedStudent,
                    }
                });
            })
        } else {
            studentApis.studentClockIn(selectedStudentInfo.id).then(studentData => {
                const updatedStudent = studentData && studentData.id ? studentData : selectedStudentInfo;
                dispatch({
                    type: StudentActions.STUDENT_DETAILS.CLOCK_IN,
                    payload: {
                        studentData: updatedStudent
                    }
                });
            })
        }
    }

    const executeAdditionalMenu = (mode) => {
        switch (mode) {
            case "deactive":
                return studentApis.deactivateStudent(selectedStudentInfo.id).then(studentData => {
                    const updatedStudent = studentData && studentData.id ? studentData : selectedStudentInfo;
                    dispatch({
                        type: StudentActions.STUDENT_DETAILS.ACCOUNT.DEACTIVATE,
                        payload: {
                            studentData: updatedStudent,
                        }
                    });
                })

            case "active":
                return studentApis.activateStudent(selectedStudentInfo.id).then(studentData => {
                    const updatedStudent = studentData && studentData.id ? studentData : selectedStudentInfo;
                    dispatch({
                        type: StudentActions.STUDENT_DETAILS.ACCOUNT.ACTIVATE,
                        payload: {
                            studentData: updatedStudent,
                        }
                    });
                })

            case "pursue":
                return studentApis.studentPursueCourse(selectedStudentInfo.id).then(studentData => {
                    const updatedStudent = studentData && studentData.id ? studentData : selectedStudentInfo;
                    dispatch({
                        type: StudentActions.STUDENT_DETAILS.ACCOUNT.PURSUE,
                        payload: {
                            studentData: updatedStudent,
                        }
                    });
                })

            case "graduate":
                return studentApis.studentGraduateCourse(selectedStudentInfo.id).then(studentData => {
                    const updatedStudent = studentData && studentData.id ? studentData : selectedStudentInfo;
                    dispatch({
                        type: StudentActions.STUDENT_DETAILS.ACCOUNT.GRADUATE,
                        payload: {
                            studentData: updatedStudent,
                        }
                    });
                })


            default: console.log(mode); break;
        }
    }

    return (
        <Grid container direction="row">
            <Grid item xs={12} lg={9}>
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12} lg={2.5}>
                        <Badge
                            badgeContent={
                                selectedStudentInfo && selectedStudentInfo.hasGraduated ?
                                    <Tooltip title="Graduated" placement="right">
                                        <SchoolIcon color="primary" />
                                    </Tooltip> :
                                    selectedStudentInfo && !selectedStudentInfo.isActive ?
                                        <Tooltip title="Is Disabled" placement="right">
                                            <NoAccountsIcon color="error" />
                                        </Tooltip> :
                                        <></>
                            }
                            sx={{ backgroundColor: "rgba(0,0,0,0)" }}
                            overlap="circular">
                            <Avatar
                                sx={{ width: 80, height: 80, backgroundColor: theme.palette.secondary.light }}
                                src={profilePic}
                                color="secondary">
                                <Typography variant='h4'><b>{name[0]}</b></Typography>
                            </Avatar>
                        </Badge>
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
                                <Tooltip title={selectedStudentInfo.isPresent ? "Log Out" : "Log In"} placement="bottom">
                                    <IconButton
                                        aria-label="logout"
                                        color='primary'
                                        disabled={!selectedStudentInfo.isActive}
                                        onClick={handleClockInOut}>
                                        {selectedStudentInfo.isPresent ? <PersonRemoveIcon /> : <PersonAddIcon />}
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} lg={4} color='primary'>
                                <IconButton color='primary' disabled={!selectedStudentInfo.isPresent}>
                                    <Tooltip title="Add New Task" placement="bottom">
                                        <AlarmAddIcon />
                                    </Tooltip>
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
                        <MenuItem onClick={() => selectAdditionalMenu("edit")} sx={{ paddingRight: 10 }}>
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
                                Deactivate
                            </MenuItem>
                        ) : (
                            <MenuItem onClick={() => selectAdditionalMenu("active")}>
                                <IconButton aria-label="addtime">
                                    <VerifiedUserIcon />
                                </IconButton>
                                Reactivate
                            </MenuItem>
                        )}

                        {selectedStudentInfo.hasGraduated ? (
                            <MenuItem onClick={() => selectAdditionalMenu("pursue")} >
                                <IconButton aria-label="addtime">
                                    <HandshakeIcon />
                                </IconButton>
                                Pursue
                            </MenuItem>
                        ) : (
                            <MenuItem onClick={() => selectAdditionalMenu("graduate")}>
                                <IconButton aria-label="addtime">
                                    <SchoolIcon />
                                </IconButton>
                                Graduate
                            </MenuItem>
                        )}

                        <MenuItem onClick={() => selectAdditionalMenu("remove")}>
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