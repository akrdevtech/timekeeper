import React from 'react'
import StudentsListItem from './components/StudentsListItem'
import { Grid } from '@mui/material'
import AppliedFiltersContainer from './components/AppliedFiltersContainer';
import FilterTray from './components/FilterTray';
import noSearchResults from "../../../../assets/images/placeholders/noSearchResults.svg";

const StudentsList = (props) => {
    const { studentsList, selectedStudentId, handleSelectStudentId } = props;
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
                        studentsList.length ? (studentsList.map(studentInfo => (
                            <Grid item xs={11} lg={6} key={studentInfo.id} >
                                <StudentsListItem
                                    studentInfo={studentInfo}
                                    selectedStudentId={selectedStudentId}
                                    handleSelectStudentId={handleSelectStudentId}
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

export default StudentsList