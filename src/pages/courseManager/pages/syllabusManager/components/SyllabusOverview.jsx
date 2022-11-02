
import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'

const SyllabusOverview = () => {

    return (
        <Grid container direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2} sx={{ paddingTop: 2 }}>
            <Grid item xs={9} >
                <Card sx={{ minHeight: '50vh', borderRadius: 2, boxShadow: 'none' }}>
                    <CardContent>
                        <Typography variant="h3" color="secondary"><b>Title of the topic</b></Typography>
                        <Typography variant="body1" color="textSecondary">Description about the topic</Typography>
                    </CardContent>
                </Card>

            </Grid>
            <Grid item xs={3} >
                <Grid container direction="row" spacing={2} alignItems="stretch">
                    <Grid item xs={12} >
                        <Card sx={{ width: '100%', minHeight: '24vh', borderRadius: 2, boxShadow: 'none', textAlign: 'center' }}>
                            <CardContent sx={{ marginTop: "10%" }}>
                                <Typography variant="h1" color="textSecondary"><b>120</b></Typography>
                                <Typography variant="body1" color="secondary"><b>Child Topics</b></Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 2 }}>
                    <Card sx={{ width: '100%', minHeight: '24vh', borderRadius: 2, boxShadow: 'none', textAlign: 'center' }}>
                        <CardContent sx={{ marginTop: "10%" }}>
                            <Typography variant="h1" color="textSecondary"><b>120</b></Typography>
                            <Typography variant="body1" color="secondary"><b>Sibling Topics</b></Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default SyllabusOverview