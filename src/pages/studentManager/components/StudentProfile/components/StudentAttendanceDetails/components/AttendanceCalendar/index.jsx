import { Button, Grid, IconButton, Menu, MenuItem, Paper, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import dateUtils from '../../../../../../../../utils/dateHelpers'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CalendarDateButtons from './components/CalendarDateButtons';
import CalendarHeading from './components/CalendarHeading';
import { StudentContext } from '../../../../../../Store';
import StudentActions from '../../../../../../Actions';

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

    const {
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

    const handleDateChange = (date, dateData) => {
        dispatch({
            type: StudentActions.STUDENT_DETAILS.ATTENDANCE_CALENDAR.SELECT_DATE,
            payload: {
                selectedDate: new Date(date),
                clockedIn: dateData && dateData.clockedInAt ? dateUtils.formatLocaleTimeString(dateData.clockedInAt) : null,
                clockedOut: dateData && dateData.clockedOutAt ? dateUtils.formatLocaleTimeString(dateData.clockedOutAt) : null,
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
                                                            handleClick={(d, dataValue) => handleDateChange(d, dataValue)}
                                                            handleDoubleClick={(d, dataValue) => console.log(d)}
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
        </Grid>
    )
}

export default AttendanceCalendar