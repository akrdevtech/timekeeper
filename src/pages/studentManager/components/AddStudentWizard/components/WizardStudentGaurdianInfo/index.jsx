import { Button, Grid, TextField } from '@mui/material';
import React from 'react'

const WizardStudentGaurdianInfo = (props) => {

  const { handleActiveTabChange, gaurdianInfo, setGaurdianInfo, hasVerified, handleValidateAll, errors, createStudent } = props;
  const { nameOfGaurdian, phoneOfGaurdian } = gaurdianInfo;

  const handleInputChange = (field, value) => {
    setGaurdianInfo({ ...gaurdianInfo, [field]: value })
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
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='name of gaurdian'
            size="small"
            value={nameOfGaurdian}
            onChange={(e) => handleInputChange("nameOfGaurdian", e.target.value)}
            error={errorKeys.includes("nameOfGaurdian")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='phone of gaurdian'
            size="small"
            value={phoneOfGaurdian}
            onChange={(e) => handleInputChange("phoneOfGaurdian", e.target.value)}
            error={errorKeys.includes("phoneOfGaurdian")}
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
              onClick={() => createStudent()}>
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

export default WizardStudentGaurdianInfo