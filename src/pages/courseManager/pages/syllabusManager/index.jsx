import { Grid } from '@mui/material'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PageHeader from '../../../../components/common/PageHeader';

const SyllabusManager = () => {
    const breadCrumbs = [
        {
            label: "Home",
            icon: <HomeIcon fontSize='small' />,
            link: '/courses'
        },
        {
            label: "Syllabus",
            icon: <MenuBookIcon fontSize='small' />,
            link: '/courses/syllabus'
        }
    ]
    return (
        <Grid container direction="row">
            <Grid item xs={12} lg={8} sx={{ backgroundColor: "#F5F8FB", padding: 2, minHeight: window.innerHeight }}>
                <PageHeader breadCrumbs={breadCrumbs} handleBreadCrumbsClick={() => { }} pageTitle="Course Manager" >
                    <Grid item xs={12} sx={{ paddingBottom: 2, paddingTop: 2 }}>
                        Body
                    </Grid>
                    <Grid item xs={12} sx={{ paddingBottom: 2 }}>
                        Title of content
                    </Grid>
                </PageHeader>
            </Grid>
            <Grid item xs={12} lg={4} sx={{ minHeight: window.innerHeight }}>
                advanced
            </Grid>
        </Grid>
    )
}

export default SyllabusManager