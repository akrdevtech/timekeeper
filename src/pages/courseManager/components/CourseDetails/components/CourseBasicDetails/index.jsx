import React, { useContext } from 'react'
import { CourseContext } from '../../../../Store'
import CourseDetailsBasicInfo from './components/CourseDetailsBasicInfo'
import CourseDetailsEnrollmentsInfo from './components/CourseDetailsEnrollmentsInfo';

const CourseBasicDetails = () => {
    const [state] = useContext(CourseContext);
    const { selectedCourseInfo } = state;
    if (!selectedCourseInfo) {
        return <></>
    }
    return (
        <>
            <CourseDetailsBasicInfo selectedCourseInfo={selectedCourseInfo} />
            <CourseDetailsEnrollmentsInfo selectedCourseInfo={selectedCourseInfo} />
        </>
    )
}

export default CourseBasicDetails