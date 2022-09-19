import { Button, Grid, MenuItem, TextField } from '@mui/material';
import React from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const WizardStudentCourseInfo = (props) => {

  const { courseInfo, setCourseInfo, handleActiveTabChange, errors } = props;

  const { course, dateOfAdmission, admissionNumber } = courseInfo;
  const handleInputChange = (field, value) => {
    setCourseInfo({ ...courseInfo, [field]: value })
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
        sx={{ paddingTop: 30 }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} lg={6}>
            <TextField
              select
              fullWidth
              variant='outlined'
              label='course'
              size="small"
              value={course}
              onChange={(e) => handleInputChange("course", e.target.value)}
              error={errorKeys.includes("course")}
            >
              <MenuItem key={undefined} value={undefined}></MenuItem>
              <MenuItem key="IELTS_REGULAR" value="IELTS_REGULAR">IELTS REGULAR</MenuItem>
              <MenuItem key="IELTS_WEEKEND" value="IELTS_WEEKEND">IELTS WEEKEND</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} lg={6}>
            <DesktopDatePicker
              value={dateOfAdmission}
              onChange={(newValue) => {
                handleInputChange("dateOfAdmission", newValue);
              }}
              renderInput={(params) =>
                <TextField {...params}
                  fullWidth
                  variant='outlined'
                  label='date of admission'
                  size="small"
                  error={errorKeys.includes("dateOfAdmission")}
                />
              }
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='admission number'
              size="small"
              value={admissionNumber}
              onChange={(e) => handleInputChange("admissionNumber", e.target.value)}
              error={errorKeys.includes("admissionNumber")}
            />
          </Grid>
        </LocalizationProvider>
        <Grid item xs={12} lg={6} sx={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          margin: '0 0',
        }}>
          <Button variant='outlined' size='small'
            sx={{ minWidth: 100, margin: 2 }}
            onClick={() => handleActiveTabChange("contactInfo")}
          >
            Back
          </Button>
          <Button variant='contained' size='small'
            sx={{ minWidth: 100 }}
            onClick={() => handleActiveTabChange("gaurdianInfo")}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default WizardStudentCourseInfo