import { Card, Grid, Typography, CardHeader, useTheme, IconButton } from '@mui/material'
import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';

const CourseListItem = (props) => {
  const theme = useTheme();
  const { courseInfo, selectedCourseId, handleSelectCourseId } = props;
  const isSelected = courseInfo.id === selectedCourseId;
  const cardStyle = {
    minWidth: 275,
    boxShadow: "none",
    borderRadius: 2,
    backgroundColor: isSelected ? theme.palette.secondary.main : theme.palette.common.white,
    color: isSelected ? theme.palette.common.white : "textSecondary"
  }
  return (
    <Card sx={cardStyle} onClick={() => handleSelectCourseId(courseInfo.id)}>
      <Grid container justifyContent="space-between" alignItems="center" >
        <Grid item xs={12} lg={6} >
          <CardHeader
            title={(<Typography variant='body1' color={isSelected ? "white" : "secondary"}><b>{courseInfo.courseName}</b></Typography>)}
            subheader={(<Typography variant='caption'>{courseInfo.courseId}</Typography>)}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <CardHeader
            title={(
              <>
                <IconButton><AccessTimeIcon sx={{ fontSize: 15, color: isSelected ? "white" : "textSecondary" }} /></IconButton>
                <Typography variant='caption' color={isSelected ? "white" : "textSecondary"}>
                  {parseFloat(Number(courseInfo.duration) / 28).toFixed(1)} Months
                </Typography>
              </>
            )}
            subheader={(
              <>
                <IconButton><PeopleIcon sx={{ fontSize: 15, color: isSelected ? "white" : "textSecondary" }} /></IconButton>
                <Typography variant='caption' color={isSelected ? "white" : "textSecondary"}>
                  {courseInfo.studentsAttending}
                </Typography>
              </>
            )}
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default CourseListItem