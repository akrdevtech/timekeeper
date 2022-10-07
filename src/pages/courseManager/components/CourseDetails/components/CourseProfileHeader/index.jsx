import { CardHeader, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { useContext } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { CourseContext } from '../../../../Store';

const CourseProfileHeader = () => {
    const [state, dispatch] = useContext(CourseContext);
    const { selectedCourseInfo } = state;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleAdditionalMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAdditionalMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid container direction="row">
            <Grid item xs={12} lg={11}>
                <Typography variant='h6' color="secondary"><b>{selectedCourseInfo.courseName}</b></Typography>
                <Typography variant='caption'>{selectedCourseInfo.courseId}</Typography>
            </Grid>

            <Grid item xs={12} lg={1}>
                <Grid item xs={12} lg={4} >
                    <IconButton aria-label="addtime" onClick={handleAdditionalMenuClick}>
                        <MoreVertIcon />
                    </IconButton>
                </Grid>
            </Grid>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleAdditionalMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem sx={{ paddingRight: 10 }}>
                    <IconButton aria-label="addtime">
                        <EditIcon />
                    </IconButton>
                    Edit
                </MenuItem>
            </Menu>
        </Grid>
    )
}

export default CourseProfileHeader