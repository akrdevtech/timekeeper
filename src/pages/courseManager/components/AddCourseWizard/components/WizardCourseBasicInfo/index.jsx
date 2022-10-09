import { Button, Grid, IconButton, InputAdornment, MenuItem, TextField, Tooltip } from '@mui/material';
import React from 'react'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

const WizardCourseBasicInfo = (props) => {

  const { basicInfo, setBasicInfo, handleActiveTabChange, errors, hasVerified, handleValidateAll, createCourse } = props;

  const { courseId,
    courseName,
    duration,
    syllabus,
    fee,
    totalCredits,
    minCredits, } = basicInfo;

  const handleInputChange = (field, value) => {
    setBasicInfo({ ...basicInfo, [field]: value })
  }

  const errorKeys = errors.map(err => {
    return err.context.key
  })

  return (
    <Grid item xs={11}>
      <Grid container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={5}
        sx={{ paddingTop: 10 }}
      >
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='course name'
            size="small"
            onChange={(e) => handleInputChange("courseName", e.target.value)}
            value={courseName}
            error={errorKeys.includes("courseName")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='duration'
            size="small"
            value={duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
            error={errorKeys.includes("duration")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='course id'
            size="small"
            onChange={(e) => handleInputChange("courseId", e.target.value)}
            value={courseId}
            error={errorKeys.includes("courseId")}
            InputProps={{
              endAdornment:
                <InputAdornment position="start">
                  <Tooltip title="auto generate" placement="bottom">
                    <IconButton><AutoFixHighIcon /></IconButton>
                  </Tooltip>
                </InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            select
            fullWidth
            variant='outlined'
            label='syllabus'
            size="small"
            value={syllabus}
            onChange={(e) => handleInputChange("syllabus", e.target.value)}
            error={errorKeys.includes("syllabus")}
          >
            <MenuItem key={undefined} value={undefined}></MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='total credits'
            size="small"
            value={totalCredits}
            onChange={(e) => handleInputChange("totalCredits", e.target.value)}
            error={errorKeys.includes("totalCredits")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='min credits'
            size="small"
            value={minCredits}
            onChange={(e) => handleInputChange("minCredits", e.target.value)}
            error={errorKeys.includes("minCredits")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='fee'
            size="small"
            value={fee}
            onChange={(e) => handleInputChange("fee", e.target.value)}
            error={errorKeys.includes("fee")}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={12} lg={6} sx={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          margin: '0 0',
        }}>
          <Button
            variant='outlined' size='small'
            sx={{ minWidth: 100, margin: 2 }}
            onClick={() => handleActiveTabChange("courseInfo")}>
            Back
          </Button>
          {hasVerified ? (
            <Button variant='contained' size='small'
              sx={{ minWidth: 100 }}
              onClick={() => createCourse()}>
              Submit
            </Button>
          ) : (
            <Button variant='outlined' size='small'
              sx={{ minWidth: 100 }}
              onClick={() => handleValidateAll()}>
              Proceed
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default WizardCourseBasicInfo