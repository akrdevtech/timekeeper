import React, { useContext, useEffect, useState } from 'react'
import StudentsList from './components/StudentsList'
import { Alert, Button, Grid, IconButton, InputAdornment, Snackbar, TextField, Typography } from '@mui/material'
import StudentProfile from './components/StudentProfile'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddStudentWizard from './components/AddStudentWizard';
import studentApis from '../../api/studentServices';
import { StudentContext } from './Store'
import StudentActions from "./Actions";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const StudentManager = () => {

    const [state, dispatch] = useContext(StudentContext);

    const {
        isAddStudentWizardOpen,
        studentsList,
        studentListPagination,
        selectedStudentId,
        selectedStudentInfo,
        snackBarAttributes,
        appliedStudentListFilters,
        studentDetailsActiveTab,
        refreshStudentList
    } = state;

    const changeStudentDetailsActiveTab = (activeTabName) => {
        console.log(`Payload ${activeTabName}`)
        dispatch({ type: StudentActions.STUDENT_DETAILS.CHANGE_TABS, payload: { activeTabName } });
    }

    const closeAddStudentWizard = () => {
        dispatch({ type: StudentActions.STUDENT_WIZARD.CLOSE });
    };
    const openAddStudentWizard = () => {
        dispatch({ type: StudentActions.STUDENT_WIZARD.OPEN });
    };

    const handleSelectStudentId = (thisStudentId) => {
        const thisStudent = studentsList.find(stud => stud.id === thisStudentId);
        dispatch({
            type: StudentActions.STUDENTS_LIST.SELECT_STUDENT,
            payload: {
                selectedStudentId: thisStudentId,
                selectedStudentInfo: thisStudent,
                activeTabName: 'profile'
            }
        });
    }

    const getUpdatedStudentList = () => {
        const { page, limit } = studentListPagination;
        studentApis.getStudentsList(page, limit, appliedStudentListFilters).then(studentListData => {
            const { count, rows } = studentListData
            dispatch({
                type: StudentActions.STUDENTS_LIST.GET_UPDATED,
                payload: {
                    pagination: { page, limit, totalPages: Math.ceil(count / limit) },
                    studentsList: rows,
                    refreshStudentList: false,
                }
            });
        });
    }

    const handleCreateNewStudent = (studentCreateParams) => {
        const { page, limit } = studentListPagination;
        studentApis.createNewStudent(studentCreateParams).then(res => {
            if (!res.success) {
                dispatch({ type: StudentActions.STUDENT_WIZARD.ADD_STUDENT.FAILURE });
            }
            studentApis.getStudentsList(page, limit, appliedStudentListFilters).then(studentListData => {
                const { count, rows } = studentListData
                dispatch({
                    type: StudentActions.STUDENT_WIZARD.ADD_STUDENT.SUCCESS,
                    payload: {
                        pagination: { page, limit, totalPages: Math.ceil(count / limit) },
                        studentsList: rows,
                    }
                });
            });
        })
    }

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({ type: StudentActions.SNACK_BAR.CLOSE });
    };

    const [searchText, setSearchText] = useState(appliedStudentListFilters.search);

    const handleInputChange = (field, value) => {
        setSearchText(value)
    }

    const handleSearch = () => {
        const newAppliedFilters = { ...appliedStudentListFilters, search: searchText };
        dispatch({
            type: StudentActions.STUNDENT_LIST_FILTER_TRAY.APPLY_FILTERS,
            payload: { appliedStudentListFilters: newAppliedFilters }
        })
    }

    useEffect(() => {
        getUpdatedStudentList();
    }, [])

    useEffect(() => {
        setSearchText(appliedStudentListFilters.search)
        getUpdatedStudentList();
    }, [appliedStudentListFilters, studentListPagination.page, refreshStudentList === true])


    return (
        <Grid container direction="row">
            <Grid item xs={12} lg={8} sx={{ backgroundColor: "#F5F8FB", padding: 2, minHeight: window.innerHeight }}>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Typography variant='h5'><b>Student Manager</b></Typography><br />
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
                                        type: StudentActions.STUNDENT_LIST_FILTER_TRAY.TOGGLE
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
                                    onClick={openAddStudentWizard}
                                >
                                    Add Student
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <StudentsList studentsList={studentsList} selectedStudentId={selectedStudentId} handleSelectStudentId={handleSelectStudentId} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} lg={4} sx={{ minHeight: window.innerHeight }}>
                <StudentProfile
                    selectedStudentInfo={selectedStudentInfo}
                    studentDetailsActiveTab={studentDetailsActiveTab}
                    changeStudentDetailsActiveTab={changeStudentDetailsActiveTab}
                />
            </Grid>
            <AddStudentWizard open={isAddStudentWizardOpen} handleClose={closeAddStudentWizard} handleCreateNewStudent={handleCreateNewStudent} />
            <Snackbar
                open={snackBarAttributes.open}
                autoHideDuration={6000}
                onClose={handleSnackBarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                <Alert onClose={handleSnackBarClose} severity={snackBarAttributes.severity} sx={{ width: '100%' }}>
                    {snackBarAttributes.message}
                </Alert>
            </Snackbar>
        </Grid>
    )
}

export default StudentManager