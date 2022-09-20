import { IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'

const CalendarDateButtons = (props) => {
    const { active, label, size, handleDateClick, date } = props;
    const theme = useTheme();

    return (
        <IconButton sx={{
            width: size || 60,
            height: size || 60,
            borderRadius: 2,
            backgroundColor: active ? theme.palette.secondary.main : "transparent",
            color: active ? "white" : theme.palette.text.secondary,
        }}
            onClick={() => handleDateClick(date)}
        >
            <Typography variant='caption' sx={{ fontSize: size ? (size / 5) : 12 }}>{label}</Typography>
        </IconButton>
    )
}

export default CalendarDateButtons