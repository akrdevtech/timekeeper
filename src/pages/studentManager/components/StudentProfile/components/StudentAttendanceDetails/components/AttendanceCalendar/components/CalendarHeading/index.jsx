import { Typography } from '@mui/material';
import React from 'react'

const CalendarHeading = (props) => {
    const { size } = props;
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return weekDays.map(days => <td key={days}><Typography variant='caption' fontSize={size ? (size / 4) : 12}><b>{days}</b></Typography></td>)
}

export default CalendarHeading