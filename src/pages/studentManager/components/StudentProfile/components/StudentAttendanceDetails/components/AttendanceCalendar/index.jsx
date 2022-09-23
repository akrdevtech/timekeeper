import { Button, Grid, IconButton, List, ListItem, Menu, MenuItem, Paper, TextField, Tooltip, Typography, useTheme } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import dateUtils from '../../../../../../../../utils/dateHelpers'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CalendarDateButtons from './components/CalendarDateButtons';
import CalendarHeading from './components/CalendarHeading';
import { StudentContext } from '../../../../../../Store';
import StudentActions from '../../../../../../Actions';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import dateHelpers from '../../../../../../../../utils/dateHelpers';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import studentApis from '../../../../../../../../api/studentServices';
import attendanceApis from '../../../../../../../../api/attendanceServices';

const getWeeksLayout = (year, month, selectedMonthAttendance) => {
    const clockIns = selectedMonthAttendance.map(dateAttendance => new Date(dateAttendance.clockedInAt).setHours(0, 0, 0, 0));
    const relativeStart = new Date(year, month, 1)
    const firstDay = new Date(relativeStart.getFullYear(), relativeStart.getMonth(), 1);
    const lastDay = new Date(relativeStart.getFullYear(), relativeStart.getMonth() + 1, 0);
    const firstDayIndex = firstDay.getDay()
    const numberOfDays = lastDay.getDate();
    const thisMonth = [];
    for (let index = 0; index < firstDayIndex; index++) {
        const elem = {
            label: <FiberManualRecordIcon fontSize='small' sx={{ color: "#ddd" }} />,
            date: null,
            active: false,
        }
        thisMonth.push(elem);
    }
    for (let index = 1; index < 43; index++) {
        const elem = {
            label: index,
            date: new Date(year, month, index).setHours(0, 0, 0, 0),
            active: false,
        }
        if (index <= numberOfDays) {
            const dataIndex = clockIns.indexOf(elem.date);
            elem.active = dataIndex > -1;
            elem.data = selectedMonthAttendance[dataIndex];
        }
        if (index > numberOfDays) {
            elem.label = <FiberManualRecordIcon fontSize='small' sx={{ color: "#ddd" }} />
            elem.date = null;
        }
        thisMonth.push(elem);
    }

    const monthByWeeks = [];
    let weekData = [];
    for (let index = 0; index < thisMonth.length; index++) {
        if ((index + 1) % 7 === 0) {
            weekData.push(thisMonth[index])
            monthByWeeks.push(weekData);
            weekData = []
        } else {
            weekData.push(thisMonth[index]);
        }
    }
    return monthByWeeks;

}

const AttendanceCalendar = (props) => {
    const [state, dispatch] = useContext(StudentContext);
    const theme = useTheme();

    const {
        selectedStudentInfo,
        selectedStudentAttendance: {
            selectedYear,
            selectedMonth,
            selectedMonthAttendance,
            selectedDate,
            clockedIn,
            clockedOut,
            totalAttendance,
            thisMonthAttendance,
        }
    } = state;
    const { size } = props;

    const [monthData, setThisMonthData] = useState(getWeeksLayout(selectedYear, selectedMonth, selectedMonthAttendance));

    const handleYearChange = (newYear) => {
        dispatch({
            type: StudentActions.STUDENT_DETAILS.ATTENDANCE_CALENDAR.CHANGE_YEAR,
            payload: {
                year: newYear,
            }
        });
    }

    const handleMonthChange = (newMonth) => {
        dispatch({
            type: StudentActions.STUDENT_DETAILS.ATTENDANCE_CALENDAR.CHANGE_MONTH,
            payload: {
                month: newMonth,
            }
        });
    }

    const [selectedDateValues, setSelectedDateValues] = useState({
        editClockInValue: clockedIn,
        editClockOutValue: clockedOut,
        studentId: selectedStudentInfo.id,
        attendanceId: null,
    })

    const handleDateChange = (date, dateData, labelVal) => {
        setSelectedDateValues({
            ...selectedDateValues,
            editClockInValue: isNaN(labelVal) ? null : dateData && dateData.clockedInAt ? dateData.clockedInAt : new Date(selectedDate).setHours(0, 0, 0, 0),
            editClockOutValue: isNaN(labelVal) ? null : dateData && dateData.clockedOutAt ? dateData.clockedOutAt : new Date(selectedDate).setHours(0, 0, 0, 0),
            studentId: dateData && dateData.studentId ? dateData.studentId : selectedStudentInfo.id,
            attendanceId: dateData && dateData.id ? dateData.id : null,
        });
        dispatch({
            type: StudentActions.STUDENT_DETAILS.ATTENDANCE_CALENDAR.SELECT_DATE,
            payload: {
                selectedDate: new Date(date),
                clockedIn: dateData && dateData.clockedInAt ? dateData.clockedInAt : null,
                clockedOut: dateData && dateData.clockedOutAt ? dateData.clockedOutAt : null,
            }
        });
    }

    const [monthMenuAnchor, setMonthMenuAnchor] = React.useState(null);

    const handleMonthSelector = (event) => {
        setMonthMenuAnchor(event.currentTarget);
    };
    const handleCloseMonthSelector = () => {
        setMonthMenuAnchor(null);
    };
    const selectMonth = (monthIndex) => {
        handleMonthChange(monthIndex);
        handleCloseMonthSelector();
    }
    const monthSelectorOpen = Boolean(monthMenuAnchor);

    const [yearMenuAnchor, setYearMenuAnchor] = React.useState(null);

    const handleYearSelector = (event) => {
        setYearMenuAnchor(event.currentTarget);
    };
    const handleCloseYearSelector = () => {
        setYearMenuAnchor(null);
    };

    const yearSelectorOpen = Boolean(yearMenuAnchor);

    useEffect(() => {
        console.log("Use effect triggered")
        setThisMonthData(getWeeksLayout(selectedYear, selectedMonth, selectedMonthAttendance))
    }, [selectedYear, selectedMonth, selectedMonthAttendance])

    const [editTimingsAnchorEl, setEditTimingsAnchorEl] = React.useState(null);

    const handleOpenEditTimings = (event) => {
        setEditTimingsAnchorEl(event.currentTarget);
    };

    const handleCloseEditTimings = () => {
        setEditTimingsAnchorEl(null);
    };

    const open = Boolean(editTimingsAnchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleDeleteAttendance = () => {
        if (dateHelpers.dateWithoutTimeIsEqual(new Date(), new Date(selectedDate))) {
            studentApis.studentClockOut(selectedStudentInfo.id).then(studentData => {
                attendanceApis.deleteAttendance(selectedDateValues.attendanceId).then(() => {
                    const updatedStudent = studentData && studentData.id ? studentData : selectedStudentInfo;
                    dispatch({
                        type: StudentActions.STUDENT_DETAILS.ATTENDANCE_CALENDAR.DELETE_ATTENDANCE,
                        payload: {
                            selectedStudentInfo: updatedStudent,
                            refreshStudentList: true,
                        }
                    });
                    handleCloseEditTimings();
                })
            })
        } else {
            attendanceApis.deleteAttendance(selectedDateValues.attendanceId).then(() => {
                dispatch({
                    type: StudentActions.STUDENT_DETAILS.ATTENDANCE_CALENDAR.DELETE_ATTENDANCE,
                    payload: {
                        studentData: null,
                        refreshStudentList: true,
                    }
                });
                handleCloseEditTimings();
            })
        }
    }

    const handleUpsertAttendance = () => {
        if (dateHelpers.dateWithoutTimeIsEqual(new Date(), new Date(selectedDate)) && !selectedDateValues.attendanceId) {
            studentApis.studentClockIn(selectedStudentInfo.id).then(studentData => {
                const updatedStudent = studentData && studentData.id ? studentData : selectedStudentInfo;
                dispatch({
                    type: StudentActions.STUDENT_DETAILS.CLOCK_IN,
                    payload: {
                        studentData: updatedStudent,
                        refreshAttendanceCalendar: true,
                    }
                });
                handleCloseEditTimings();
            })
        } else {
            attendanceApis.upsertAttendance(
                selectedStudentInfo.id,
                selectedDateValues.editClockInValue,
                selectedDateValues.editClockOutValue,
                selectedDateValues.attendanceId,
            )
                .then(() => {
                    dispatch({ type: StudentActions.STUDENT_DETAILS.ATTENDANCE_CALENDAR.INSERT_ATTENDANCE });
                    handleCloseEditTimings();
                })
        }
    }

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", borderRadius: 2, paddingBottom: 2 }} >
                <Grid container direction="row" justifyContent="center" alignItems="center" >
                    <Grid item xs={10} >
                        <Grid container direction="row" justifyContent="center" alignItems="center" >
                            <Grid item xs={6} lg={6}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" >
                                    <IconButton onClick={() => handleYearChange(selectedYear - 1)}>
                                        <ArrowLeftIcon />
                                    </IconButton>
                                    <Button onClick={handleYearSelector}>
                                        <Typography variant='body1' color="textPrimary">
                                            <b>{selectedYear}</b>
                                        </Typography>
                                    </Button>
                                    <IconButton onClick={() => handleYearChange(selectedYear + 1)} >
                                        <ArrowRightIcon />
                                    </IconButton>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={yearMenuAnchor}
                                        open={yearSelectorOpen}
                                        onClose={handleCloseYearSelector}
                                    >
                                        <TextField
                                            sx={{ width: 70 }}
                                            size="small"
                                            value={selectedYear}
                                            onChange={(e) => handleYearChange(e.target.value)}>
                                        </TextField>
                                    </Menu>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} lg={6}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" >
                                    <IconButton disabled={selectedMonth === 0} onClick={() => handleMonthChange(selectedMonth - 1)}>
                                        <ArrowLeftIcon />
                                    </IconButton>
                                    <Button onClick={handleMonthSelector}>
                                        <Typography variant='body1' color="textPrimary">
                                            <b>{dateUtils.getMonthName(selectedMonth).part}</b>
                                        </Typography>
                                    </Button>
                                    <IconButton disabled={selectedMonth === 11} onClick={() => handleMonthChange(selectedMonth + 1)}>
                                        <ArrowRightIcon />
                                    </IconButton>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={monthMenuAnchor}
                                        open={monthSelectorOpen}
                                        onClose={handleCloseMonthSelector}
                                    >
                                        {
                                            Array.from(Array(12).keys())
                                                .map(
                                                    index =>
                                                        <MenuItem onClick={() => selectMonth(index)} key={index}>
                                                            {dateUtils.getMonthName(index).part}
                                                        </MenuItem>
                                                )
                                        }
                                    </Menu>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <table style={{ textAlign: "center", width: "100%" }}>
                                    <tbody>
                                        <tr>
                                            <CalendarHeading size={size} />
                                        </tr>
                                        {monthData.map((weeks, i) => (
                                            <tr key={i.toString()}>
                                                {weeks.map((weekDays, j) =>
                                                    <td key={j.toString()}>
                                                        <CalendarDateButtons
                                                            label={weekDays.label}
                                                            active={weekDays.active}
                                                            size={size}
                                                            handleClick={(d, dataValue, labelVal) => handleDateChange(d, dataValue, labelVal)}
                                                            handleDoubleClick={(e, d, dataValue) => handleOpenEditTimings(e)}
                                                            date={weekDays.date}
                                                            data={weekDays.data}
                                                        />
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Grid>
                        </Grid >
                    </Grid>
                </Grid>
            </Paper >
            <Menu
                id={id}
                open={open}
                anchorEl={editTimingsAnchorEl}
                onClose={handleCloseEditTimings}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List sx={{ width: '100%', minWidth: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
                    {(dateHelpers.dateWithoutTimeIsEqual(new Date(), new Date(selectedDate)) && !selectedDateValues.attendanceId) ?
                        (
                            <>
                                <ListItem style={{ marginTop: theme.spacing(2), justifyContent: 'center' }}>
                                    <Button
                                        onClick={handleUpsertAttendance}
                                        variant='outlined'
                                        color='secondary'
                                        startIcon={<PersonAddIcon />}
                                    >
                                        Log In
                                    </Button>
                                </ListItem>
                                <ListItem style={{ justifyContent: 'right' }}>
                                    <IconButton onClick={handleCloseEditTimings}>
                                        <Tooltip title="Close Without Changes" placement="bottom">
                                            <CloseIcon />
                                        </Tooltip>
                                    </IconButton>
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <ListItem >
                                    <Typography variant="body2">
                                        Date : <b>{selectedDate ? dateHelpers.formatAsPartDate(selectedDate) : 'MM dd,YYYY'}</b>
                                    </Typography>
                                </ListItem>

                                <ListItem style={{ marginTop: theme.spacing(2) }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="Clock In At"
                                            value={selectedDateValues.editClockInValue}
                                            onChange={(newValue) => {
                                                setSelectedDateValues({ ...selectedDateValues, editClockInValue: new Date(newValue) });
                                            }}
                                            renderInput={(params) => <TextField {...params} size="small" />}
                                        />
                                    </LocalizationProvider>
                                </ListItem>

                                <ListItem style={{ marginTop: theme.spacing(2) }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            label="Clock Out At"
                                            value={selectedDateValues.editClockOutValue}
                                            onChange={(newValue) => {
                                                setSelectedDateValues({ ...selectedDateValues, editClockOutValue: new Date(newValue) });
                                            }}
                                            renderInput={(params) => <TextField {...params} size="small" />}
                                        />
                                    </LocalizationProvider>
                                </ListItem>

                                <ListItem style={{ marginTop: theme.spacing(2), justifyContent: 'right' }}>
                                    <IconButton
                                        onClick={handleUpsertAttendance}
                                        disabled={!(selectedDateValues.editClockInValue && selectedDateValues.editClockOutValue)}
                                    >
                                        <Tooltip title="Submit Changes" placement="bottom">
                                            <DoneIcon />
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton
                                        onClick={handleDeleteAttendance}
                                        disabled={!(
                                            selectedDateValues.attendanceId
                                        )}
                                    >
                                        <Tooltip title="Delete Attendance" placement="bottom">
                                            <DeleteOutlineIcon />
                                        </Tooltip>
                                    </IconButton>
                                    <IconButton onClick={handleCloseEditTimings}>
                                        <Tooltip title="Close Without Changes" placement="bottom">
                                            <CloseIcon />
                                        </Tooltip>
                                    </IconButton>
                                </ListItem>
                            </>
                        )
                    }

                </List >
            </Menu >
        </Grid >
    )
}

export default AttendanceCalendar