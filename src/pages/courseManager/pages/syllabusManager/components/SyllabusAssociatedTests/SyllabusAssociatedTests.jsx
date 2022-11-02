import React from 'react'
import { Grid, Typography } from '@mui/material'
import GlobalEnums from '../../../../../../contexts/global/Enums';
import SyllabusTasksCard from './components/SyllabusTasksCard';

const SyllabusAssociatedTests = () => {
  const { tasks: { modes } } = GlobalEnums;

  const removeTaskFromTopic = (taskId) => {
    console.log(`Removing : ${taskId}`);
  }

  const openSelectedTask = (taskId) => {
    console.log(`Opening : ${taskId}`);
  }

  const modedTasks = [
    {
      taskHeader: 'Listening',
      taskList: [{ mode: modes.LISTENING }]
    },
    {
      taskHeader: 'Speaking',
      taskList: [{ mode: modes.SPEAKING }]
    },
    {
      taskHeader: 'Reading',
      taskList: [{ mode: modes.READING }]
    },
    {
      taskHeader: 'Writing 1',
      taskList: [{ mode: modes.WRITING.ONE }]
    },
    {
      taskHeader: 'Writing 2',
      taskList: [{ mode: modes.WRITING.TWO }]
    },
  ]
  return (
    <Grid container direction="row" spacing={5}>
      {modedTasks.map(thisTaskMode => (
        <Grid item xs={12} key={thisTaskMode.taskHeader}>
          <Typography
            variant='h5'
            color='textSecondary'
            sx={{ marginBottom: 2 }}
          >
            <b>{thisTaskMode.taskHeader}</b>
          </Typography>
          <Grid container direction="row" spacing={2}>
            {thisTaskMode.taskList.map((i, index) => (
              <SyllabusTasksCard
                key={index.toString()}
                taskMode={i.mode}
                taskName={`${i.mode}${index}`}
                handleTaskDelete={removeTaskFromTopic}
                handleTaskOpen={openSelectedTask}
                taskId={index}
              />
            ))}
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default SyllabusAssociatedTests
