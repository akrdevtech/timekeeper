import { Alert, IconButton, Snackbar } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';



const GenericSnackBar = ({ open, duration, handleClose, message, severity }) => {
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            open={open}
            autoHideDuration={duration || 6000}
            onClose={handleClose}
            message={message}
            action={action}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            severity={severity}
        >
            <Alert variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default GenericSnackBar