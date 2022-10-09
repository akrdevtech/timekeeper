import api from "./httpApi";

const getCourseList = async (page, limit, appliedStudentListFilters) => {
    const { status, search } = appliedStudentListFilters;

    let url = `/courses?page=${page}&limit=${limit}`;

    if (status !== 'any' && !status.includes('any')) {
        status.map(cid => {
            return url = `${url}&status=${cid}`
        })
    }
    if (search !== '') {
        url = `${url}&search=${search}`
    }
    return await api.get(url).then((response) => {
        if (response) {
            const {
                data,
                data: { success },
            } = response;

            if (success !== undefined) {
                const { count, rows } = data.data;
                const responseData = {
                    count,
                    rows,
                }
                return responseData;
            }
            console.log('No response data');
            return { count: 0, rows: [] };
        }
        console.log('Error occured while communicating with api');
        return { count: 0, rows: [] };
    })
}

const createNewCourse = async (createParams) => {
    const { basicInfo } = createParams;
    const courseCreateParams = {
        courseId: basicInfo.courseId,
        courseName: basicInfo.courseName,
        duration: basicInfo.duration || 0,
        fee: basicInfo.fee || 0,
        totalCredits: basicInfo.totalCredits || 0,
        minCredits: basicInfo.minCredits || 0,
    }
    return api.post('/courses', courseCreateParams).then((response) => {
        if (response) {
            const {
                data,
                data: { success },
            } = response;

            if (success !== undefined) {
                return data;
            }
            console.log('No response data');
            return null;
        }
        console.log('Error occured while communicating with api');
        return null;
    })
}

const courseApis = {
    getCourseList,
    createNewCourse,
}
export default courseApis;