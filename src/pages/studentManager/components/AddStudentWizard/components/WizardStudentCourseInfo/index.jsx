import { Button, Grid, IconButton, InputAdornment, MenuItem, TextField, Tooltip } from '@mui/material';
import React, { useEffect } from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import AddStudentWizardData from '../data'
import courseApis from '../../../../../../api/courseServices';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import studentApis from '../../../../../../api/studentServices';

const WizardStudentCourseInfo = (props) => {

  const { courseInfo, setCourseInfo, handleActiveTabChange, errors, activeTab } = props;

  const { course, dateOfAdmission, admissionNumber } = courseInfo;
  const handleInputChange = (field, value) => {
    setCourseInfo({ ...courseInfo, [field]: value })
  }

  const errorKeys = errors.map(err => {
    return err.context.key
  })

  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    courseApis.getAllActiveCoursesList().then(courseListData => {
      setCourseList(courseListData);
    })
  }, [activeTab === AddStudentWizardData.tabIds.COURSE_INFO])

  const handleGenerateAdmissionNumber = () => {
    studentApis.autogenerateAdmissionNumber(course, dateOfAdmission).then(autoAdmno => {
      handleInputChange('admissionNumber', autoAdmno);
    })
  }

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
              {courseList.map(cData => (<MenuItem key={cData.courseId} value={cData.courseId}>{cData.courseName}</MenuItem>))}
            </TextField>
          </Grid>
          <Grid item xs={12} lg={6}>
            <DesktopDatePicker
              value={dateOfAdmission}
              onChange={(newValue) => {
                handleInputChange("dateOfAdmission", new Date(newValue));
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
              InputProps={{
                endAdornment:
                  <InputAdornment position="start">
                    <Tooltip title="auto generate" placement="bottom">
                      <IconButton onClick={handleGenerateAdmissionNumber}><AutoFixHighIcon /></IconButton>
                    </Tooltip>
                  </InputAdornment>,
              }}
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