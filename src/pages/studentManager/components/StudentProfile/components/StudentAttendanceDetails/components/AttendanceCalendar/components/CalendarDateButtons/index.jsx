import { IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'

const CalendarDateButtons = (props) => {
    const { active, label, size, handleClick, handleDoubleClick, date, data } = props;
    const theme = useTheme();
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
        }}
            onClick={() => handleClick(date, data)}
            onDoubleClick={() => handleDoubleClick(date, data)}
        >
            <Typography variant='caption' sx={{ fontSize: size ? (size / 5) : 12 }}>{label}</Typography>
        </IconButton>
    )
}

export default CalendarDateButtons