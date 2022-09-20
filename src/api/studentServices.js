import api from "./httpApi";

const formatDataToStudentList = (rows = []) => {
    const response = rows.map(row => {
        return {
            id: row.id,
            name: row.name,
            gender: row.gender,
            dateOfBirth: row.dateOfBirth,
            occupation: row.occupation,
            isPresent: row.isPresent,
            contactInfo: {
                email: row.email,
                phone: row.phone,
                addressLine1: row.addressLine1,
                addressLine2: row.addressLine2,
                pin: row.pin,
            },
            courseInfo: {
                course: row.course,
                dateOfAdmission: row.dateOfAdmission,
                admissionNumber: row.admissionNumber,
            },
            gaurdianInfo: {
                nameOfGaurdian: row.nameOfGaurdian,
                phoneOfGaurdian: row.phoneOfGaurdian,
            },
            performanceInfo: {
                listening: Number(row.performanceListening),
                speaking: Number(row.performanceSpeaking),
                reading: Number(row.performanceReading),
                writing1: Number(row.performanceWriting1),
                writing2: Number(row.performanceWriting2),
            }
        }
    })
    return response;
}
const getStudentsList = async (page, limit, appliedStudentListFilters) => {
    const { admission, graduation, presence, course, search } = appliedStudentListFilters;

    // return Promise.resolve(studentsList);
    let url = `/students?page=${page}&limit=${limit}`;
    if (admission !== 'any') {
        url = `${url}&admission=${admission}`
    }
    if (graduation !== 'any') {
        url = `${url}&graduation=${graduation}`
    }
    if (presence !== 'any') {
        url = `${url}&presence=${presence}`
    }
    if (course !== 'any' && !course.includes('any')) {
        course.map(cid=>{
            url = `${url}&course=${cid}`
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
                const studentList = formatDataToStudentList(rows);
                const responseData = {
                    count,
                    rows: studentList,
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

const createNewStudent = async (createParams) => {
    const { basicInfo, contactInfo, courseInfo, gaurdianInfo } = createParams;
    const studentCreateParams = {
        name: basicInfo.name,
        gender: basicInfo.gender,
        dateOfBirth: basicInfo.dateOfBirth,
        occupation: basicInfo.occupation,
        contactInfo: {
            email: contactInfo.email,
            phone: contactInfo.phone,
            addressLine1: contactInfo.addressLine1,
            addressLine2: contactInfo.addressLine2,
            pin: contactInfo.pin,
        },
        courseInfo: {
            course: courseInfo.course,
            dateOfAdmission: courseInfo.dateOfAdmission,
            admissionNumber: courseInfo.admissionNumber,
        },
        gaurdianInfo: {
            nameOfGaurdian: gaurdianInfo.nameOfGaurdian,
            phoneOfGaurdian: gaurdianInfo.phoneOfGaurdian,
        }
    }
    return api.post('/students', studentCreateParams).then((response) => {
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

const studentApis = {
    getStudentsList,
    createNewStudent,
}
export default studentApis;