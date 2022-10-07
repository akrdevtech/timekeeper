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

const courseApis = {
    getCourseList,
}
export default courseApis;