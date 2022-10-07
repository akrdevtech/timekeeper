import { Button, Card, Checkbox, FormControl, Grid, Grow, IconButton, InputLabel, ListItemText, MenuItem, Select, TextField } from '@mui/material';
import React, { useContext } from 'react'
import { CourseContext } from '../../../../Store';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CourseActions from '../../../../Actions';

const FilterTray = () => {
    const [state, dispatch] = useContext(CourseContext);
    const { appliedCourseListFilters, filterTrayToggle } = state;

    const defaultState = {
        status: ['active']
    }
    const [thisTrayFilters, setThisTrayFilters] = useState(defaultState);

    const { status } = thisTrayFilters;

    const handleInputChange = (field, value) => {
        setThisTrayFilters({ ...thisTrayFilters, [field]: value })
    }

    const handleApplyDefault = () => {
        setThisTrayFilters(defaultState);
    }

    const handleApplyFilters = () => {
        const newAppliedFilters = { ...appliedCourseListFilters, status };
        dispatch({
            type: CourseActions.COURSE_LIST_FILTER_TRAY.APPLY_FILTERS,
            payload: { appliedCourseListFilters: newAppliedFilters }
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
        handleInputChange("status", coursesSelected);
    };

    const handleUnselectAll = () => {
        handleInputChange("status", ['any']);
    }

    const availableStatus = [
        { value: "active", label: 'ACTIVE' },
        { value: "inactive", label: 'INACTIVE' },
    ]

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
                        <FormControl fullWidth>
                            <InputLabel id="demo-multiple-name-label">status</InputLabel>
                            <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                size="small"
                                fullWidth
                                value={status}
                                onChange={handleChange}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                <MenuItem key="any" value="any"></MenuItem>
                                {availableStatus.map((availableStatusData) => (
                                    <MenuItem key={availableStatusData.value} value={availableStatusData.value}>
                                        <Checkbox checked={status.indexOf(availableStatusData.value) > -1} />
                                        <ListItemText primary={availableStatusData.label} />
                                    </MenuItem>
                                ))}
                                <Button fullWidth onClick={handleUnselectAll}>Unselect All</Button>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} lg={7}></Grid>
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
                                type: CourseActions.COURSE_LIST_FILTER_TRAY.TOGGLE
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