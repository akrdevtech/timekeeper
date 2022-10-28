import api from "./httpApi";


const getSyllabusForCourse = async (courseId) => {

    let url = `/syllabus?courseId=${courseId}`;

    return await api.get(url).then((response) => {
        if (response) {
            const {
                data,
                data: { success },
            } = response;

            if (success !== undefined) {
                const courseSyllabus = data.data;
                return courseSyllabus;
            }
            console.log('No response data');
            return null;
        }
        console.log('Error occured while communicating with api');
        return null;
    })
}



const syllabusApis = {
    getSyllabusForCourse
}
export default syllabusApis;