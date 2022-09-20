import React from 'react'
import { Paper, Grid, Typography } from '@mui/material'
import PerformanceProgress from './components/PerformanceProgress';

const StudentProfilePerformanceInfo = (props) => {
    const {
        performanceInfo: {
            listening,
            speaking,
            reading,
            writing1,
            writing2,
        }
    }=props;

    const total = (Number(listening)+Number(speaking)+Number(reading)+Number(writing1)+Number(writing2))/5;
    return (
        <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", marginTop: 2, borderRadius: 2, padding: 2 }} >
            <Typography variant='body1' color="textSecondary" sx={{ paddingBottom: 1 }}><b>Performance</b></Typography>
            <Grid container direction="row" justifyContent="space-evenly" alignItems="flex-end" >

                <PerformanceProgress variant="determinate" value={listening} label={"L"} size={50} thickness={5} colorize={"true"} />

                <PerformanceProgress variant="determinate" value={speaking} label={"S"} size={50} thickness={5} colorize={"true"} />

                <PerformanceProgress variant="determinate" value={reading} label={"R"} size={50} thickness={5} colorize={"true"} />

                <PerformanceProgress variant="determinate" value={writing1} label={"W1"} size={50} thickness={5} colorize={"true"} />

                <PerformanceProgress variant="determinate" value={writing2} label={"W2"} size={50} thickness={5} colorize={"true"} />

                <PerformanceProgress variant="determinate" value={total} label={"ALL"} size={90} colorize={"true"} />

            </Grid>
        </Paper>
    )
}

export default StudentProfilePerformanceInfo