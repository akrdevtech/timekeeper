import { Card, Grid, Avatar, Typography, CardHeader, Badge, useTheme, Button, IconButton } from '@mui/material'
import React from 'react'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
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
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item xs={12} lg={11}>
          <CardHeader
            title={(<Typography variant='h6' color={isSelected ? "white" : "secondary"}><b>{courseInfo.courseName}</b></Typography>)}
            subheader={(<Typography variant='caption'>{courseInfo.courseId}</Typography>)}
          />
        </Grid>
        <Grid item xs={12} lg={1}>
          <Badge color={courseInfo.status === "active" ? "success" : "error"} variant="dot" sx={{ bottom: 30, left: 20 }} />
        </Grid>
        <Grid item xs={12} lg={11}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ padding: '0em 1em 1em 1em' }}>
            <Grid item xs={12} lg={4}>
              <IconButton><AccessTimeIcon sx={{ fontSize: 15 }} /></IconButton>
              <Typography variant='caption'>
                {parseFloat(Number(courseInfo.duration) / 28).toFixed(1)} Months
              </Typography>

            </Grid>
            <Grid item xs={12} lg={4}>
              <IconButton><CurrencyRupeeIcon sx={{ fontSize: 15 }} /></IconButton>
              <Typography variant='caption'>{courseInfo.fee}</Typography>
            </Grid>
            <Grid item xs={12} lg={4}>
              <IconButton><PeopleIcon sx={{ fontSize: 15 }} /></IconButton>
              <Typography variant='caption'>{courseInfo.studentsAttending}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default CourseListItem