import React, { useContext } from 'react'
import StudentProfileGaurdianInfo from './components/StudentProfileGaurdianInfo'
import StudentProfileContactInfo from './components/StudentProfileContactInfo'
import StudentProfileCourseInfo from './components/StudentProfileCourseInfo'
import StudentProfileBasicInfo from './components/StudentProfileBasicInfo'
import StudentProfilePerformanceInfo from './components/StudentProfilePerformanceInfo'
import { StudentContext } from '../../../../Store'

const StudentProfileDetails = () => {
    const [state] = useContext(StudentContext);
    const { selectedStudentInfo } = state;
    if (!selectedStudentInfo) {
        return <></>
    }
    const contactInfo = selectedStudentInfo.contactInfo;
    const courseInfo = selectedStudentInfo.courseInfo;
    const gaurdianInfo = selectedStudentInfo.gaurdianInfo;
    const basicInfo = {
        name: selectedStudentInfo.name,
        gender: selectedStudentInfo.gender,
        dateOfBirth: selectedStudentInfo.dateOfBirth,
        occupation: selectedStudentInfo.occupation,
        isPresent: selectedStudentInfo.isPresent,
    };
    const performanceInfo = selectedStudentInfo.performanceInfo;
    return (
        <>
            <StudentProfileContactInfo contactInfo={contactInfo} />
            <StudentProfileCourseInfo courseInfo={courseInfo} />
            <StudentProfileGaurdianInfo gaurdianInfo={gaurdianInfo} />
            <StudentProfileBasicInfo basicInfo={basicInfo}/>
            <StudentProfilePerformanceInfo performanceInfo={performanceInfo}/>
        </>
    )
}

export default StudentProfileDetails