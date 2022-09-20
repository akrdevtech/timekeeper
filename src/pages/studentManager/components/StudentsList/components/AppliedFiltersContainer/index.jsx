import React, { useContext } from 'react'
import { Chip, Grid } from '@mui/material'
import PaginationButtons from '../../../../../../components/common/PaginationButtons'
import { StudentContext } from '../../../../Store';
import StudentActions from '../../../../Actions';

const AppliedFiltersContainer = props => {
    const [state, dispatch] = useContext(StudentContext);
    const { appliedStudentListFilters, filterTrayToggle, studentListPagination } = state;

    const {
        admission,
        graduation,
        presence,
        course,
        search,
    } = appliedStudentListFilters;

    const handleDelete = (field) => {
        let value = 'any'
        switch (field) {
            case 'search': value = ''; break;
            default: value = 'any'; break;
        }
        dispatch({
            type: StudentActions.STUNDENT_LIST_FILTER_TRAY.APPLY_FILTERS,
            payload: { appliedStudentListFilters: { ...appliedStudentListFilters, [field]: value } }
        })
    }

    const handlePageChange = (mode) => {
        if (mode === 'inc') {
            dispatch({ type: StudentActions.STUDENT_LIST_PAGINATION.INCREMENT })
        } else {
            dispatch({ type: StudentActions.STUDENT_LIST_PAGINATION.DECREMENT })
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
                {admission !== 'any' && <Chip label={`Admission : ${admission}`} variant="outlined" onDelete={() => handleDelete('admission')} />}
                {graduation !== 'any' && <Chip label={`Graduation : ${graduation}`} variant="outlined" onDelete={() => handleDelete('graduation')} />}
                {presence !== 'any' && <Chip label={`Presence : ${presence}`} variant="outlined" onDelete={() => handleDelete('presence')} />}
                {course !== 'any' && course !== '' && !course.includes('any') && <Chip label={`Course : ${course}`} variant="outlined" onDelete={() => handleDelete('course')} />}
                {search !== '' && <Chip label={`Search : ${search}`} variant="outlined" onDelete={() => handleDelete('search')} />}
            </Grid>
            <Grid item xs={12} lg={2} sx={{ textAlign: "right" }}>
                <PaginationButtons currentPage={studentListPagination.page} numberOfPages={studentListPagination.totalPages} handlePageChange={handlePageChange}/>
            </Grid>
        </Grid>
    )
}

export default AppliedFiltersContainer