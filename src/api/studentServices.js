import api from "./httpApi";

const studentsDTO = (data, mode) => {
    if (mode === 'from') {
        return {
            id: data.id,
            name: data.name,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
            occupation: data.occupation,
            isPresent: data.isPresent,
            isActive: data.isActive,
            contactInfo: {
                email: data.email,
                phone: data.phone,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2,
                pin: data.pin,
            },
            courseInfo: {
                course: data.course,
                dateOfAdmission: data.dateOfAdmission,
                admissionNumber: data.admissionNumber,
            },
            gaurdianInfo: {
                nameOfGaurdian: data.nameOfGaurdian,
                phoneOfGaurdian: data.phoneOfGaurdian,
            },
            performanceInfo: {
                listening: Number(data.performanceListening),
                speaking: Number(data.performanceSpeaking),
                reading: Number(data.performanceReading),
                writing1: Number(data.performanceWriting1),
                writing2: Number(data.performanceWriting2),
            }
        }
    } else {
        return data;
    }
}
const formatDataToStudentList = (rows = []) => {
    const response = rows.map(row => {
        return studentsDTO(row, 'from');
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
        course.map(cid => {
            return url = `${url}&course=${cid}`
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

const studentClockIn = (studentId, date = new Date().toISOString()) => {
    return api.post(`/students/${studentId}/clock-in`, { clockedInAt: date }).then((response) => {
        if (response) {
            const {
                data,
                data: { success },
            } = response;

            if (success !== undefined) {
                const studentInfo = data.data;
                const studentData = studentsDTO(studentInfo, 'from');
                return studentData;
            }
            console.log('No response data');
            return {};
        }
        console.log('Error occured while communicating with api');
        return null;
    })
}

const studentClockOut = (studentId, date = new Date().toISOString()) => {
    return api.patch(`/students/${studentId}/clock-out`, { clockedOutAt: date }).then((response) => {
        if (response) {
            const {
                data,
                data: { success },
            } = response;

            if (success !== undefined) {
                const studentInfo = data.data;
                console.log({ studentInfo });
                const studentData = studentsDTO(studentInfo, 'from');
                return studentData;
            }
            console.log('No response data');
            return {};
        }
        console.log('Error occured while communicating with api');
        return null;
    })
}

const studentApis = {
    getStudentsList,
    createNewStudent,
    studentClockIn,
    studentClockOut
}
export default studentApis;