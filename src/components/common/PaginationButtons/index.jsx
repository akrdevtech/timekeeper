import React from 'react'
import { IconButton, Typography } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const PaginationButtons = (props) => {
    let { currentPage, numberOfPages,handlePageChange } = props;
    return (
        <>
            <IconButton
                disabled={!currentPage} color='primary'
                onClick={()=>handlePageChange("dec")}
            >
                <KeyboardArrowLeftIcon />
            </IconButton>
            <Typography variant="overline" color="textSecondary">
                <b>{numberOfPages ? currentPage + 1 : currentPage} &nbsp; of &nbsp; {numberOfPages}</b>
            </Typography>
            <IconButton
                disabled={!numberOfPages || currentPage + 1 === numberOfPages} color='primary'
                onClick={()=>handlePageChange("inc")}
            >
                <KeyboardArrowRightIcon />
            </IconButton>
        </>
    )
}

export default PaginationButtons