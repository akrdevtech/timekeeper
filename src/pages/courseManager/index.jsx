import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { CourseContext } from './Store';
import CourseActions from './Actions';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import courseApis from '../../api/courseServices';
import CourseList from './components/CoursesList';
import CourseDetails from './components/CourseDetails';
import AddCourseWizard from './components/AddCourseWizard';
import PageHeader from '../../components/common/PageHeader';
import HomeIcon from '@mui/icons-material/Home';

const CourseManager = () => {
    const [state, dispatch] = useContext(CourseContext);

    const {
        isAddCourseWizardOpen,
        appliedCourseListFilters,
        coursesList,
        selectedCourseId,
        courseListPagination,
        refreshCourseList,
        selectedCourseInfo,
        courseDetailsActiveTab
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

    const changeCourseDetailsActiveTab = (activeTabName) => {
        dispatch({ type: CourseActions.COURSE_DETAILS.CHANGE_TABS, payload: { activeTabName } });
    }

    const closeAddCourseWizard = () => {
        dispatch({ type: CourseActions.COURSE_WIZARD.CLOSE });
    };
    const openAddCourseWizard = () => {
        dispatch({ type: CourseActions.COURSE_WIZARD.OPEN });
    };

    const handleCreateNewCourse = (courseCreateParams) => {
        const { page, limit } = courseListPagination;
        courseApis.createNewCourse(courseCreateParams).then(res => {
            if (!res.success) {
                dispatch({ type: CourseActions.COURSE_WIZARD.ADD_COURSE.FAILURE });
            }
            courseApis.getCourseList(page, limit, appliedCourseListFilters).then(courseListData => {
                const { count, rows } = courseListData
                dispatch({
                    type: CourseActions.COURSE_WIZARD.ADD_COURSE.SUCCESS,
                    payload: {
                        pagination: { page, limit, totalPages: Math.ceil(count / limit) },
                        coursesList: rows,
                    }
                });
            });
        })
    }

    useEffect(() => {
        getUpdatedCourseList();
    }, [])

    useEffect(() => {
        setSearchText(appliedCourseListFilters.search)
        getUpdatedCourseList();
    }, [appliedCourseListFilters.search, courseListPagination.page, refreshCourseList === true])

    const breadCrumbs = [
        {
            label: "Home",
            icon: <HomeIcon fontSize='small' />,
            link: '/courses'
        }
    ]
    return (
        <Grid container direction="row">
            <Grid item xs={12} lg={8} sx={{ backgroundColor: "#F5F8FB", padding: 2, minHeight: window.innerHeight }}>
                <PageHeader breadCrumbs={breadCrumbs} handleBreadCrumbsClick={() => { }} pageTitle="Course Manager" >
                    <Grid item xs={12} sx={{ paddingBottom: 2, paddingTop: 2 }}>
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
                                    onClick={openAddCourseWizard}
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
                </PageHeader>
            </Grid>
            <Grid item xs={12} lg={4} sx={{ minHeight: window.innerHeight }}>
                <CourseDetails
                    selectedCourseInfo={selectedCourseInfo}
                    courseDetailsActiveTab={courseDetailsActiveTab}
                    changeCourseDetailsActiveTab={changeCourseDetailsActiveTab}
                />
            </Grid>
            <AddCourseWizard
                open={isAddCourseWizardOpen}
                handleClose={closeAddCourseWizard}
                handleCreateNewCourse={handleCreateNewCourse}
            />
        </Grid>
    )
}

export default CourseManager