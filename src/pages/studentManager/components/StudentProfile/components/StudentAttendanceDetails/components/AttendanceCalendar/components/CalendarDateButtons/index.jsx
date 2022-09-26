import { IconButton, Typography, useTheme } from '@mui/material'
import React, { useContext } from 'react'
import dateHelpers from '../../../../../../../../../../utils/dateHelpers';
import { StudentContext } from '../../../../../../../../Store';

const CalendarDateButtons = (props) => {
    const { active, label, size, handleClick, handleDoubleClick, date, data } = props;
    const theme = useTheme();
    const [state] = useContext(StudentContext);
    const { selectedStudentAttendance: {
        selectedDate,
        selectedYear,
    }, } = state;
    const isSelectedDate = new Date(selectedDate).getFullYear() === selectedYear && dateHelpers.dateWithoutTimeIsEqual(selectedDate, date)
    const clickFunction = isNaN(label) ? () => { } : handleClick;
    const doubleClickFunction = isNaN(label) ? () => { } : handleDoubleClick;
    return (
        <IconButton color="secondary" sx={{
            width: size || 60,
            height: size || 60,
            borderRadius: 2,
            backgroundColor: active ? theme.palette.secondary.main : "transparent",
            color: active ? "white" : theme.palette.text.secondary,
            '&:hover': {
                background: theme.palette.text.secondary,
                color: "white",
            },
            borderStyle: 'solid',
            borderWidth: isSelectedDate ? 2 : 0,
            borderColor: isSelectedDate ? theme.palette.warning.main : "transparent",
        }}
            onClick={() => clickFunction(date, data, Number(label))}
            onDoubleClick={(e) => doubleClickFunction(e, date, data)}
            onContextMenu={(e) => { e.preventDefault(); doubleClickFunction(e, date, data) }}
        >
            <Typography variant='caption' sx={{ fontSize: size ? (size / 4) : 12 }}>{label}</Typography>
        </IconButton>
    )
}

export default CalendarDateButtons