import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { CourseContext } from './Store';
import CourseActions from './Actions';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import courseApis from '../../api/courseServices';
import CourseList from './components/CoursesList';

const CourseManager = () => {
    const [state, dispatch] = useContext(CourseContext);

    const {
        appliedCourseListFilters,
        coursesList,
        selectedCourseId,
        courseListPagination,
        refreshCourseList,
    } = state;

    const [searchText, setSearchText] = useState(appliedCourseListFilters.search);

    const handleInputChange = (field, value) => {
        setSearchText(value)
    }

    const handleSearch = () => {
        const newAppliedFilters = { ...appliedCourseListFilters, search: searchText };
        dispatch({
            type: CourseActions.COURSE_LIST_FILTER_TRAY.APPLY_FILTERS,
            payload: { appliedCourseListFilters: newAppliedFilters }
        })
    }

    const handleSelectCourseId = (thisCourseId) => {
        const thisCourse = coursesList.find(stud => stud.id === thisCourseId);
        dispatch({
            type: CourseActions.COURSES_LIST.SELECT_COURSE,
            payload: {
                selectedCourseId: thisCourseId,
                selectedCourseInfo: thisCourse,
                activeTabName: 'basic'
            }
        });
    }

    const getUpdatedCourseList = () => {
        const { page, limit } = courseListPagination;
        courseApis.getCourseList(page, limit, appliedCourseListFilters).then(studentListData => {
            const { count, rows } = studentListData
            dispatch({
                type: CourseActions.COURSES_LIST.GET_UPDATED,
                payload: {
                    pagination: { page, limit, totalPages: Math.ceil(count / limit) },
                    coursesList: rows,
                    refreshCourseList: false,
                }
            });
        });
    }

    useEffect(() => {
        getUpdatedCourseList();
    }, [])

    useEffect(() => {
        setSearchText(appliedCourseListFilters.search)
        getUpdatedCourseList();
    }, [appliedCourseListFilters.search, courseListPagination.page, refreshCourseList === true])

    return (
        <Grid container direction="row">
            <Grid item xs={12} lg={8} sx={{ backgroundColor: "#F5F8FB", padding: 2, minHeight: window.innerHeight }}>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Typography variant='h5'><b>Course Manager</b></Typography><br />
                    </Grid>
                    <Grid item xs={12} sx={{ paddingBottom: 2 }}>
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item xs={7}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    size='small'
                                    value={searchText}
                                    onChange={(e) => handleInputChange("search", e.target.value)}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton color="primary" onClick={handleSearch}>
                                                    <SearchOutlinedIcon />
                                                </IconButton>
                                            </InputAdornment>,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    onClick={() => dispatch({
                                        type: CourseActions.COURSE_LIST_FILTER_TRAY.TOGGLE
                                    })}
                                    variant='outlined'
                                    sx={{ height: 40, marginLeft: 2 }}
                                >
                                    <FilterAltIcon />
                                </Button>
                            </Grid>
                            <Grid item xs={3} justifyContent="flex-end">
                                <Button
                                    variant='contained'
                                    sx={{ height: 40, float: "right" }}
                                // onClick={openAddStudentWizard}
                                >
                                    Add Course
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <CourseList
                            coursesList={coursesList}
                            selectedCourseId={selectedCourseId}
                            handleSelectCourseId={handleSelectCourseId}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} lg={4} sx={{ minHeight: window.innerHeight }}>
                {/* <StudentProfile
                    selectedStudentInfo={selectedStudentInfo}
                    studentDetailsActiveTab={studentDetailsActiveTab}
                    changeStudentDetailsActiveTab={changeStudentDetailsActiveTab}
                /> */}
            </Grid>
            {/* <AddStudentWizard open={isAddStudentWizardOpen} handleClose={closeAddStudentWizard} handleCreateNewStudent={handleCreateNewStudent} /> */}
        </Grid>
    )
}

export default CourseManager