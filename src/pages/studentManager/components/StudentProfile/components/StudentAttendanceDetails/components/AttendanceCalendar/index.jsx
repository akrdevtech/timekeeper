import { Button, Grid,  IconButton, Menu, MenuItem, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import dateUtils from '../../../../../../../../utils/dateHelpers'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CalendarDateButtons from './components/CalendarDateButtons';
import CalendarHeading from './components/CalendarHeading';

const getWeeksLayout = (year, month) => {
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
            date: new Date(year, month, index),
            active: false,
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

    const { size } = props;

    const today = new Date();
    const [thisYear, setThisYear] = useState(today.getFullYear());
    const [thisMonth, setThisMonth] = useState(today.getMonth());
    const [monthData, setThisMonthData] = useState(getWeeksLayout(thisYear, thisMonth));

    const handleYearChange = (newYear) => {
        setThisYear(newYear);
    }

    const handleMonthChange = (newMonth) => {
        setThisMonth(newMonth);
    }

    const [monthMenuAnchor, setMonthMenuAnchor] = React.useState(null);

    const handleMonthSelector = (event) => {
        setMonthMenuAnchor(event.currentTarget);
    };
    const handleCloseMonthSelector = () => {
        setMonthMenuAnchor(null);
    };
    const selectMonth = (monthIndex) => {
        setThisMonth(monthIndex);
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
        setThisMonthData(getWeeksLayout(thisYear, thisMonth))
    }, [thisYear, thisMonth])

    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", borderRadius: 2, paddingBottom: 2 }} >
                <Grid container direction="row" justifyContent="center" alignItems="center" >
                    <Grid item xs={10} >
                        <Grid container direction="row" justifyContent="center" alignItems="center" >
                            <Grid item xs={6} lg={6}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" >
                                    <IconButton onClick={() => handleYearChange(thisYear - 1)}>
                                        <ArrowLeftIcon />
                                    </IconButton>
                                    <Button onClick={handleYearSelector}>
                                        <Typography variant='body1' color="textPrimary">
                                            <b>{thisYear}</b>
                                        </Typography>
                                    </Button>
                                    <IconButton onClick={() => handleYearChange(thisYear + 1)} >
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
                                            value={thisYear}
                                            onChange={(e) => handleYearChange(e.target.value)}>
                                        </TextField>
                                    </Menu>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} lg={6}>
                                <Grid container direction="row" justifyContent="center" alignItems="center" >
                                    <IconButton disabled={thisMonth === 0} onClick={() => handleMonthChange(thisMonth - 1)}>
                                        <ArrowLeftIcon />
                                    </IconButton>
                                    <Button onClick={handleMonthSelector}>
                                        <Typography variant='body1' color="textPrimary">
                                            <b>{dateUtils.getMonthName(thisMonth).part}</b>
                                        </Typography>
                                    </Button>
                                    <IconButton disabled={thisMonth === 11} onClick={() => handleMonthChange(thisMonth + 1)}>
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
                                                        <MenuItem onClick={() => selectMonth(index)}>
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
                                        {monthData.map(weeks => (
                                            <tr>
                                                {weeks.map(weekDays =>
                                                    <td>
                                                        <CalendarDateButtons
                                                            label={weekDays.label}
                                                            active={weekDays.active}
                                                            size={size}
                                                            handleDateClick={(d) => console.log(d)}
                                                            date={weekDays.date}
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