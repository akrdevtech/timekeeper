import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import BreadcrumbsNavigation from '../BreadCrumbsNavigation'

const PageHeader = (props) => {
    const { breadCrumbs, handleBreadCrumbsClick, pageTitle } = props
    return (
        <Grid container direction="row">
            <Grid item xs={4}>
                <Typography variant='h5'><b>{pageTitle}</b></Typography>
            </Grid>
            <Grid item xs={8} sx={{ textAlign: "right" }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    <BreadcrumbsNavigation handleClick={handleBreadCrumbsClick} crumbs={breadCrumbs} />
                </Grid>
            </Grid>
            <Box component="main" sx={{ flexGrow: 1 }}>
                {props.children}
            </Box>
        </Grid>
    )
}

export default PageHeader