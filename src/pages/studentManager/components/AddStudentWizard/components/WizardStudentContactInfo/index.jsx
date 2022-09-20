import { Button, Grid, TextField } from '@mui/material';
import React from 'react'

const WizardStudentContactInfo = (props) => {

  const { handleActiveTabChange, contactInfo, setContactInfo, errors } = props;

  const { email, phone, addressLine1, addressLine2, pin, } = contactInfo;

  const handleInputChange = (field, value) => {
    setContactInfo({ ...contactInfo, [field]: value })
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
        sx={{ paddingTop: 20 }}
      >
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='email'
            size="small"
            value={email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={errorKeys.includes("email")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='phone'
            size="small"
            value={phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            error={errorKeys.includes("phone")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='address line 1'
            size="small"
            value={addressLine1}
            onChange={(e) => handleInputChange("addressLine1", e.target.value)}
            error={errorKeys.includes("addressLine1")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='address line 2'
            size="small"
            value={addressLine2}
            onChange={(e) => handleInputChange("addressLine2", e.target.value)}
            error={errorKeys.includes("addressLine2")}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TextField
            fullWidth
            variant='outlined'
            label='pin'
            size="small"
            value={pin}
            onChange={(e) => handleInputChange("pin", e.target.value)}
            error={errorKeys.includes("pin")}
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
            onClick={() => handleActiveTabChange("basicInfo")}>
            Back
          </Button>
          <Button variant='contained' size='small'
            sx={{ minWidth: 100 }}
            onClick={() => handleActiveTabChange("courseInfo")}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default WizardStudentContactInfo