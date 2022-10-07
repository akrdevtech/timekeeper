import React from 'react'
import CourseListItem from './components/CourseListItem'
import { Grid } from '@mui/material'
import noSearchResults from "../../../../assets/images/placeholders/noSearchResults.svg";
import AppliedFiltersContainer from './components/AppliedFiltersContainer';
import FilterTray from './components/FilterTray';

const CourseList = (props) => {
    const { coursesList, selectedCourseId, handleSelectCourseId } = props;
    return (
        <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs={12} lg={12} sx={{ paddingBottom: 2 }}>
                <FilterTray />
            </Grid>
            <Grid item xs={12} lg={12} sx={{ paddingBottom: 2 }}>
                <AppliedFiltersContainer />
            </Grid>
            <Grid item xs={12} lg={12}>
                <Grid container spacing={2}>
                    {
                        coursesList.length ? (coursesList.map(courseInfo => (
                            <Grid item xs={11} lg={6} key={courseInfo.id} >
                                <CourseListItem
                                    courseInfo={courseInfo}
                                    selectedCourseId={selectedCourseId}
                                    handleSelectCourseId={handleSelectCourseId}
                                />
                            </Grid>
                        ))) : (<Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ marginTop: '20%' }}
                        >
                            <img src={noSearchResults} alt="user details missing" />
                        </Grid>)
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export default CourseList