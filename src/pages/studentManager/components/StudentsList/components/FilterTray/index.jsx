import { Button, Card, Checkbox, FormControl, Grid, Grow, IconButton, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { StudentContext } from '../../../../Store';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import StudentActions from '../../../../Actions';
import courseApis from '../../../../../../api/courseServices';

const FilterTray = () => {
    const [state, dispatch] = useContext(StudentContext);
    const { appliedStudentListFilters, filterTrayToggle } = state;

    const defaultState = {
        admission: 'active',
        graduation: 'ongoing',
        presence: 'any',
        course: ['any']
    }
    const [thisTrayFilters, setThisTrayFilters] = useState(defaultState);

    const { admission, graduation, presence, course } = thisTrayFilters;

    const handleInputChange = (field, value) => {
        setThisTrayFilters({ ...thisTrayFilters, [field]: value })
    }

    const handleApplyDefault = () => {
        setThisTrayFilters(defaultState);
    }

    const handleApplyFilters = () => {
        const newAppliedFilters = { ...appliedStudentListFilters, admission, graduation, presence, course };
        dispatch({
            type: StudentActions.STUDENT_LIST_FILTER_TRAY.APPLY_FILTERS,
            payload: { appliedStudentListFilters: newAppliedFilters }
        })
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        let coursesSelected = typeof value === 'string' ? value.split(',') : value;
        coursesSelected = coursesSelected.filter(cSelected => cSelected !== 'any');
        if (!coursesSelected.length) {
            coursesSelected = ['any'];
        }
        handleInputChange("course", coursesSelected);
    };

    const handleUnselectAll = () => {
        handleInputChange("course", ['any']);
    }

    const [availableCourses,setAvailableCourses] = useState([]);

    useEffect(() => {
        courseApis.getAllActiveCoursesList().then(courseListData => {
            setAvailableCourses(courseListData);
        })
      }, [filterTrayToggle === true])

    if (!filterTrayToggle)
        return <></>
    return (
        <Grow
            in={filterTrayToggle}
            style={{ transformOrigin: '0 0 0' }}
            {...(filterTrayToggle ? { timeout: 300 } : {})}
        >
            <Card sx={{ padding: 1, boxShadow: 'none' }}>
                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={1}
                    sx={{ padding: 1 }}
                >
                    <Grid item xs={12} lg={2}>
                        <TextField
                            select
                            fullWidth
                            variant='outlined'
                            label='admission'
                            size="small"
                            value={admission}
                            onChange={(e) => handleInputChange("admission", e.target.value)}
                        >
                            <MenuItem key="any" value="any">any</MenuItem>
                            <MenuItem key="active" value="active">active</MenuItem>
                            <MenuItem key="inactive" value="inactive">inactive</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <TextField
                            select
                            fullWidth
                            variant='outlined'
                            label='graduation'
                            size="small"
                            value={graduation}
                            onChange={(e) => handleInputChange("graduation", e.target.value)}
                        >
                            <MenuItem key="any" value="any">any</MenuItem>
                            <MenuItem key="ongoing" value="ongoing">ongoing</MenuItem>
                            <MenuItem key="completed" value="completed">completed</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <TextField
                            select
                            fullWidth
                            variant='outlined'
                            label='presence'
                            size="small"
                            value={presence}
                            onChange={(e) => handleInputChange("presence", e.target.value)}
                        >
                            <MenuItem key="any" value="any">any</MenuItem>
                            <MenuItem key="present" value="present">present</MenuItem>
                            <MenuItem key="absent" value="absent">absent</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} lg={2}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">course</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                size="small"
                                fullWidth
                                value={course}
                                onChange={handleChange}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                <MenuItem key="any" value="any"></MenuItem>
                                {availableCourses.map((availableCourse,index) => (
                                    <MenuItem key={index.toString()} value={availableCourse.courseId}>
                                        <Checkbox checked={course.indexOf(availableCourse.courseId) > -1} />
                                        <ListItemText primary={availableCourse.courseName} />
                                    </MenuItem>
                                ))}
                                <Button fullWidth onClick={handleUnselectAll}>Unselect All</Button>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={1}></Grid>
                    <Grid item xs={12} lg={1}>
                        <Button
                            variant='outlined' color="primary" fullWidth sx={{ minHeight: 40 }}
                            onClick={handleApplyDefault}
                        >
                            Default
                        </Button>
                    </Grid>
                    <Grid item xs={12} lg={1}>
                        <Button
                            variant='contained' color="primary" fullWidth sx={{ minHeight: 40 }}
                            onClick={handleApplyFilters}
                        >
                            Apply
                        </Button>
                    </Grid>

                    <Grid item xs={12} lg={1} sx={{ float: "right", textAlign: "right" }}>
                        <IconButton
                            color="error"
                            onClick={() => dispatch({
                                type: StudentActions.STUDENT_LIST_FILTER_TRAY.TOGGLE
                            })}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>
        </Grow>
    );
}

export default FilterTray