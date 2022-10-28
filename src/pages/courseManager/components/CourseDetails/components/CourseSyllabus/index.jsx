import { Button, Grid, IconButton, Menu, MenuItem, Paper, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { CourseContext } from '../../../../Store'
import CourseActions from '../../../../Actions';
import syllabusApis from '../../../../../../api/syllabusServices';
import SyllabusTree from './components/SyllabusTree';
import EditIcon from '@mui/icons-material/Edit';
import SyllabusEditor from './components/SyllabusEditor';
import { Link } from 'react-router-dom';

const CourseSyllabus = (props) => {
    const { activeTab } = props;
    const [state, dispatch] = useContext(CourseContext);
    const { selectedCourseInfo, courseDetailsSyllabus, selectedCourseId } = state;

    const [syllabusEditorOpen, setSyllabusEditorOpen] = React.useState(false);

    const handleSyllabusEditorOpen = () => {
        setSyllabusEditorOpen(true);
    };

    const handleSyllabusEditorClose = () => {
        setSyllabusEditorOpen(false);
    };

    const {
        courseSyllabus
    } = courseDetailsSyllabus;

    const {
        courseId
    } = selectedCourseInfo;

    useEffect(() => {
        console.log(`CourseSyllabus ${courseId}`);
        syllabusApis.getSyllabusForCourse(courseId).then(syllabusData => {
            console.log({ syllabusData });
            dispatch({
                type: CourseActions.COURSE_DETAILS.SYLLABUS.GET_UPDATED_SYLLABUS,
                payload: {
                    courseSyllabus: syllabusData,
                }
            });
        })
    }, [activeTab === 'syllabus'])

    if (!courseSyllabus) {
        return (
            <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", marginTop: 2, borderRadius: 2, padding: 2 }} >
                <Grid container direction="row" justifyContent="center" alignItems="center">
                    <Grid item xs={12} lg={6}>
                        <Typography variant='body1' color="textSecondary">There are no syllabus assigned for this course</Typography>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Button
                            variant='outlined'
                            sx={{ height: 40, float: "right" }}
                        >
                            Add Syllabus
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        )
    }
    return (
        <Paper elevation={0} sx={{ backgroundColor: "#F5F8FB", marginTop: 2, borderRadius: 2, padding: 1, paddingBottom: 2 }} >
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12} lg={11}>
                    <Typography variant='body1' color="textSecondary" sx={{ paddingBottom: 2 }}><b>Syllabus</b> : {courseSyllabus.name}</Typography>
                </Grid>
                <Grid item xs={12} lg={1} sx={{ paddingBottom: 2 }}>
                    <Link to={"/courses/syllabus"}>
                        <IconButton
                            size='small'
                        // onClick={handleSyllabusEditorOpen}
                        >
                            <EditIcon fontSize='small' />
                        </IconButton>
                    </Link>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <SyllabusTree />
                    <SyllabusEditor
                        open={syllabusEditorOpen}
                        handleClickOpen={handleSyllabusEditorOpen}
                        handleClose={handleSyllabusEditorClose} />
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CourseSyllabus