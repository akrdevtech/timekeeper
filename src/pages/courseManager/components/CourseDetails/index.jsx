import React from 'react'
import { Grid, Paper } from '@mui/material'
import DetailsTabs from '../../../../components/common/DetailTabs'
import userDetailsMissingIcon from "../../../../assets/images/placeholders/userDetailsMissing.svg";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import CourseProfileHeader from './components/CourseProfileHeader';
import CourseBasicDetails from './components/CourseBasicDetails';
import CourseEnrolledStudents from './components/CourseEnrolledStudents';

const getActiveTab = (detailsTab) => {
    switch (detailsTab) {
        case 'syllabus': return <>Syllabus</>;
        case 'students': return <CourseEnrolledStudents activeTab={detailsTab}/>
        default: return <CourseBasicDetails />
    }
}

const tabs = [
    { tabId: 'basic', tabIcon: <SchoolOutlinedIcon /> },
    { tabId: 'students', tabIcon: <PeopleAltOutlinedIcon /> },
    { tabId: 'syllabus', tabIcon: <MenuBookOutlinedIcon /> }
]

const CourseDetails = (props) => {
    const { selectedCourseInfo, courseDetailsActiveTab, changeCourseDetailsActiveTab } = props;
    return (
        <Paper elevation={0} sx={{ padding: 3, minHeight: window.innerHeight }}>
            <Grid container direction="row">
                <Grid item xs={12} lg={12}>
                    {selectedCourseInfo ? (
                        <>
                            <CourseProfileHeader selectedCourseInfo={selectedCourseInfo} />
                            <br />
                            <DetailsTabs
                                changeActiveTab={changeCourseDetailsActiveTab}
                                activeTab={courseDetailsActiveTab}
                                tabs={tabs}
                            />
                            <br />
                            {getActiveTab(courseDetailsActiveTab)}
                        </>
                    ) : (
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ marginTop: '50%' }}
                        >
                            <img src={userDetailsMissingIcon} alt="user details missing" />
                        </Grid>
                    )}
                </Grid>
            </Grid >
        </Paper>
    )
}

export default CourseDetails