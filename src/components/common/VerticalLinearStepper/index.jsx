import * as React from 'react';
import Box from '@mui/material/Box';
import StepperStep from './components/StepperStep';
import {  Typography } from '@mui/material';

const VerticalLinearStepper = (props) => {
  const { steps, handleActiveTabChange,title } = props;
  return (
    <Box sx={{ paddingLeft: 15 }}>
      <Typography sx={{
        position: 'absolute',
        bottom: 250,
        left: -100  ,
        transform: 'rotate(-90deg)',
        fontSize: 50,
        fontWeight: 700,
        opacity: 0.09
      }}>{title}</Typography>
      {steps.map(thisStep =>
        <StepperStep thisStep={thisStep} handleActiveTabChange={handleActiveTabChange} key={thisStep.tabId}/>
      )}
    </Box>
  )
}

export default VerticalLinearStepper