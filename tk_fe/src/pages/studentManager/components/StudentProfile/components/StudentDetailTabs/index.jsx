import * as React from 'react';
import { Grid, Button, useTheme } from '@mui/material';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

export default function StudentDetailsTabs(props) {
    const { changeStudentDetailsActiveTab, studentDetailsActiveTab } = props;
    const theme = useTheme()
    const activeTabTheme = { borderBottomStyle: 'solid', borderBottomColor: theme.palette.primary.main, borderBottomWidth: 2 }
    return (
        <Grid container direction="row">
            <Grid item xs={12} lg={4} sx={studentDetailsActiveTab==="profile"?activeTabTheme:{}}>
                <Button size="small" variant="text" fullWidth onClick={() => { changeStudentDetailsActiveTab("profile") }}><PermIdentityOutlinedIcon /></Button>
            </Grid>
            <Grid item xs={12} lg={4} sx={studentDetailsActiveTab==="attendance"?activeTabTheme:{}}>
                <Button size="small" variant="text" fullWidth onClick={() => { changeStudentDetailsActiveTab("attendance") }}><CalendarMonthOutlinedIcon /></Button>
            </Grid>
            <Grid item xs={12} lg={4} sx={studentDetailsActiveTab==="performance"?activeTabTheme:{}}>
                <Button size="small" variant="text" fullWidth onClick={() => { changeStudentDetailsActiveTab("performance") }}><BarChartOutlinedIcon /></Button>
            </Grid>
        </Grid>
    );
}