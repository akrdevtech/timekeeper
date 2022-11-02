import React from 'react'
import { Card, Grid, IconButton, Typography, useTheme } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TaskModeIcons from '../../TaskModeIcons';
import stringHelpers from '../../../../../../../utils/stringHelpers';


const SyllabusTasksCard = (props) => {
    const { taskMode, taskName, handleTaskDelete, handleTaskOpen, taskId } = props;
    const theme = useTheme()

    const ellipsfiedString = stringHelpers.ellipsifyString(taskName, 28)
    return (
        <Grid item xs={12} lg={4}>
            <Card>
                <Grid container direction='row' sx={{ padding: 2 }}>
                    <Grid item xs={1}>
                        <TaskModeIcons
                            mode={taskMode}
                            sx={{ color: theme.palette.text.secondary, marginTop: 0.2 }}
                            fontSize='small'
                        />
                    </Grid>
                    <Grid item xs={8}><Typography variant='caption'>{ellipsfiedString}</Typography></Grid>
                    <Grid item xs={3} sx={{ textAlign: "right" }}>
                        <IconButton size='small' onClick={() => handleTaskDelete(taskId)}>
                            <DeleteOutlineIcon fontSize='small' />
                        </IconButton>
                        <IconButton size='small' onClick={() => handleTaskOpen(taskId)}>
                            <OpenInNewIcon fontSize='small' />
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default SyllabusTasksCard;