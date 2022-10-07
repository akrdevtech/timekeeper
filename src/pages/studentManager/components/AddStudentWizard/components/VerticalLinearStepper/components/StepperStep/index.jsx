import React from 'react'
import { Grid, Typography, useTheme } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';

const getStepColor = (status, isActive, theme) => {
    if (isActive) {
        return theme.palette.warning.main;
    }
    switch (status) {
        case "success": return theme.palette.secondary.main;
        case "pending": return theme.palette.text.secondary;
        case "error": return theme.palette.error.main;
        default: return theme.palette.text.secondary;
    }
}

const StepperStep = (props) => {
    const { thisStep, handleActiveTabChange } = props;
    const theme = useTheme();
    const stepColor = getStepColor(thisStep.status, thisStep.isActive, theme);

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center"
            sx={{ minWidth: "100%", padding: 2, zIndex: 2, cursor: 'pointer' }}
            onClick={() => { handleActiveTabChange(thisStep.tabId) }}
        >
            <Grid item xs={2}>
                <Grid container direction="row" justifyContent="center" alignItems="center"
                    sx={{
                        borderRadius: 25, width: 25, height: 25, backgroundColor: stepColor
                    }}
                >
                    {thisStep.status === "success" ?
                        <CheckIcon sx={{ color: "white" }} /> :
                        <Typography variant='caption' color="white">
                            <b>{thisStep.step}</b>
                        </Typography>
                    }
                </Grid>
            </Grid>
            <Grid item xs={10}>
                <Typography variant='caption' sx={{ color: stepColor }}><b>{thisStep.label}</b></Typography>
            </Grid>
        </Grid>
    )
}

export default StepperStep