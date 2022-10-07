import React from 'react'
import { Grid, Paper } from '@mui/material'
import StudentProfileHeader from './components/StudentDetailsHeader'
import DetailsTabs from '../../../../components/common/DetailTabs'
import StudentProfileDetails from './components/StudentProfileDetails'
import userDetailsMissingIcon from "../../../../assets/images/placeholders/userDetailsMissing.svg";
import StudentAttendanceDetails from './components/StudentAttendanceDetails'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

const getActiveTab = (detailsTab) => {
    switch (detailsTab) {
        case 'attendance': return <StudentAttendanceDetails />;
        case 'performance': return <>Performance</>
        default: return <StudentProfileDetails />
    }
}

const tabs = [
    { tabId: 'profile', tabIcon: <PermIdentityOutlinedIcon /> },
    { tabId: 'attendance', tabIcon: <CalendarMonthOutlinedIcon /> },
    { tabId: 'performance', tabIcon: <BarChartOutlinedIcon /> }
]

const StudentProfile = (props) => {
    const { selectedStudentInfo, studentDetailsActiveTab, changeStudentDetailsActiveTab } = props;
    return (
        <Paper elevation={0} sx={{ padding: 3, minHeight: window.innerHeight }}>
            <Grid container direction="row">
                <Grid item xs={12} lg={12}>
                    <StudentProfileHeader selectedStudentInfo={selectedStudentInfo} />
                    <br />
                    {selectedStudentInfo ? (
                        <>
                            <DetailsTabs
                                changeActiveTab={changeStudentDetailsActiveTab}
                                activeTab={studentDetailsActiveTab}
                                tabs={tabs}
                            />
                            <br />
                            {getActiveTab(studentDetailsActiveTab)}
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

export default StudentProfile