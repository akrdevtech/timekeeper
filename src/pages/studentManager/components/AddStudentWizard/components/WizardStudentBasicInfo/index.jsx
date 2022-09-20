import { Avatar, Button, Grid, MenuItem, TextField } from '@mui/material';
import React from 'react'
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const WizardStudentBasicInfo = (props) => {

  const { basicInfo, setBasicInfo, handleActiveTabChange, errors } = props;
  const { dateOfBirth, gender, name, occupation } = basicInfo;

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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12}>
            <Avatar sx={{ width: 100, height: 100 }} />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='name'
              size="small"
              onChange={(e) => handleInputChange("name", e.target.value)}
              value={name}
              error={errorKeys.includes("name")}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              select
              fullWidth
              variant='outlined'
              label='gender'
              size="small"
              value={gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
              error={errorKeys.includes("gender")}
            >
              <MenuItem key={undefined} value={undefined}></MenuItem>
              <MenuItem key="male" value="male">male</MenuItem>
              <MenuItem key="female" value="female">female</MenuItem>
              <MenuItem key="other" value="other">other</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} lg={6}>
            <DesktopDatePicker
              value={dateOfBirth}
              onChange={(newValue) => {
                handleInputChange("dateOfBirth", new Date(newValue));
              }}
              renderInput={(params) =>
                <TextField {...params}
                  fullWidth
                  variant='outlined'
                  label='date of birth'
                  size="small"
                  error={errorKeys.includes("dateOfBirth")}
                />
              }
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <TextField
              fullWidth
              variant='outlined'
              label='occupation'
              size="small"
              onChange={(e) => handleInputChange("occupation", e.target.value)}
              value={occupation}
              error={errorKeys.includes("occupation")}
            />
          </Grid>
        </LocalizationProvider>
        <Grid item xs={12} lg={6} sx={{
          position: 'absolute',
          bottom: 40,
          right: 40,
          margin: '0 0',
        }}>
          <Button
            disabled
            variant='outlined' size='small'
            sx={{ minWidth: 100, margin: 2 }}
            onClick={() => handleActiveTabChange("basicInfo")}>
            Back
          </Button>
          <Button variant='contained' size='small'
            sx={{ minWidth: 100 }}
            onClick={() => handleActiveTabChange("contactInfo")}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default WizardStudentBasicInfo