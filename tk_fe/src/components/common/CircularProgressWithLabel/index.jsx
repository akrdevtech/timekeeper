import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const CircularProgressWithLabel = (props) => {
    const colorize = props.colorize || false;
    let progressColor = "primary";
    if (colorize) {
        if (props.value < 45)
            progressColor = "error"
        else if (props.value < 75)
            progressColor = "warning"
        else
            progressColor = "secondary"
    }
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} color={progressColor} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="body1" component="div" color="text.secondary">
                    <b>{props.label}</b>
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {colorize : PropTypes.string}

export default CircularProgressWithLabel


