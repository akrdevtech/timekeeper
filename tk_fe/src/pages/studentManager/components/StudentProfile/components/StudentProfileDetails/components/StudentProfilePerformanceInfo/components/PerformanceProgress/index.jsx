import { Grid, Typography } from '@mui/material';
import React from 'react'
import CircularProgressWithLabel from '../../../../../../../../../../components/common/CircularProgressWithLabel';

const PerformanceProgress = (props) => {
    const { value } = props;
    return (
        <Grid item xs={12} lg={2}>
            <Grid container direction="row" justifyContent="center" alignItems="flex-end">
                <Grid item xs={12} lg={12} textAlign="center">
                    <CircularProgressWithLabel variant="determinate" {...props} />
                </Grid>
                <Grid item xs={12} lg={12} textAlign="center">
                    <Typography variant="body2" color="textSecondary">{value}%</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default PerformanceProgress