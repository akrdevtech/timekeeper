import React, { useContext } from 'react'
import { Chip, Grid } from '@mui/material'
import PaginationButtons from '../../../../../../components/common/PaginationButtons'
import { CourseContext } from '../../../../Store';
import CourseActions from '../../../../Actions';

const AppliedFiltersContainer = props => {
    const [state, dispatch] = useContext(CourseContext);
    const { appliedCourseListFilters, courseListPagination } = state;

    const {
        status,
        search,
    } = appliedCourseListFilters;

    const handleDelete = (field) => {
        let value = 'any'
        switch (field) {
            case 'search': value = ''; break;
            default: value = 'any'; break;
        }
        dispatch({
            type: CourseActions.COURSE_LIST_FILTER_TRAY.APPLY_FILTERS,
            payload: { appliedCourseListFilters: { ...appliedCourseListFilters, [field]: value } }
        })
    }

    const handlePageChange = (mode) => {
        if (mode === 'inc') {
            dispatch({ type: CourseActions.COURSE_LIST_PAGINATION.INCREMENT })
        } else {
            dispatch({ type: CourseActions.COURSE_LIST_PAGINATION.DECREMENT })
        }
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{
                backgroundColor: "white",
                borderRadius: 2,
                padding: 1
            }}>
            <Grid item xs={12} lg={10}>
                {status !== 'any' && status !== '' && !status.includes('any') && <Chip label={`Status : ${status}`} variant="outlined" onDelete={() => handleDelete('status')} />}
                {search !== '' && <Chip label={`Search : ${search}`} variant="outlined" onDelete={() => handleDelete('search')} />}
            </Grid>
            <Grid item xs={12} lg={2} sx={{ textAlign: "right" }}>
                <PaginationButtons currentPage={courseListPagination.page} numberOfPages={courseListPagination.totalPages} handlePageChange={handlePageChange}/>
            </Grid>
        </Grid>
    )
}

export default AppliedFiltersContainer