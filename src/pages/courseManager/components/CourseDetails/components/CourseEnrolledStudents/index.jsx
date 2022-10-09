import { Grid, IconButton, Menu, MenuItem, Paper, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { CourseContext } from '../../../../Store'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PaginationButtons from '../../../../../../components/common/PaginationButtons';
import studentApis from '../../../../../../api/studentServices';
import CourseActions from '../../../../Actions';

const CourseEnrolledStudents = (props) => {
    const { activeTab } = props;
    const [state, dispatch] = useContext(CourseContext);
    const { selectedCourseInfo, courseDetailsStudents } = state;

    const [anchorEl, setAnchorEl] = useState(null);
    const [graduated, setGraduated] = useState("ongoing");
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleGraduationChange = (mode) => {
        handleClose();
        setGraduated(mode)
    }

    const {
        studentList,
        pagination: {
            page,
            limit,
            totalPages,
        },
        selectedStudentInCourseInfo,
    } = courseDetailsStudents;


    useEffect(() => {
        console.log(`CourseEnrolledStudents ${graduated}`);
        studentApis.getStudentsList(page, limit, { course: [selectedCourseInfo.courseId] }).then(studentListData => {
            const { count, rows } = studentListData
            console.log(rows);
            // dispatch({ type: CourseActions.COURSE_DETAILS.STUDENTS_LIST.GET_UPDATED });
            // dispatch({
            //     type: CourseActions.COURSE_DETAILS.STUDENTS_LIST.GET_UPDATED,
            //     payload: {
            //         pagination: { page, limit, totalPages: Math.ceil(count / limit) },
            //         // studentList: rows,
            //         // refreshStudentList: false,
            //     }
            // });
        })
    }, [activeTab === 'students', graduated, page])

    if (!selectedCourseInfo) {
        return <></>
    }
    return (
        <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", marginTop: 2, borderRadius: 2, padding: 1 }} >
            <Grid container direction="row">
                <Grid item xs={12} lg={6}>
                    <table style={{ verticalAlign: 'center' }}>
                        <tbody>
                            <tr>
                                <td><Typography variant='body1' color="textSecondary" ><b>Graduation &nbsp;&nbsp;</b></Typography></td>
                                <td><Typography variant='caption' color="textSecondary" ><b>{graduated}</b></Typography> </td>
                                <td><Typography variant='body2' color="textSecondary"><IconButton onClick={handleClick}><ArrowDropDownIcon /></IconButton></Typography></td>
                            </tr>
                        </tbody>
                    </table>
                </Grid>
                <Grid item xs={12} lg={6} sx={{ textAlign: "right" }}>
                    <PaginationButtons currentPage={page} numberOfPages={totalPages} handlePageChange={(e) => console.log(e)} />
                </Grid>
            </Grid>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleGraduationChange("ongoing")}>Ongoing</MenuItem>
                <MenuItem onClick={() => handleGraduationChange("completed")}>Completed</MenuItem>
            </Menu>

            <Grid container direction="row">
                {studentList.map(litem => (
                    litem.name
                ))}
            </Grid>
        </Paper>
    )
}

export default CourseEnrolledStudents