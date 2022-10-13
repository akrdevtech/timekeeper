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
            hasGraduated: data.hasGraduated,
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
    if (admission && admission !== 'any') {
        url = `${url}&admission=${admission}`
    }
    if (graduation && graduation !== 'any') {
        url = `${url}&graduation=${graduation}`
    }
    if (presence && presence !== 'any') {
        url = `${url}&presence=${presence}`
    }
    if (course && course !== 'any' && !course.includes('any')) {
        course.map(cid => {
            return url = `${url}&course=${cid}`
        })
    }
    if (search && search !== '') {
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

const deleteStudent = (studentId) => {
    return api.delete(`/students/${studentId}`).then((response) => {
        if (response) {
            const {
                data,
                data: { success },
            } = response;

            if (success !== undefined) {
                return null;
            }
            console.log('No response data');
            return {};
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

const getMonthAttendanceOverview = (studentId, year, month) => {
    return api.get(`/students/${studentId}/attendance?year=${year}&month=${month}`).then((response) => {
        if (response) {
            const {
                data,
                data: { success },
            } = response;

            if (success !== undefined) {
                const attendance = data.data;
                return attendance;
            }
            console.log('No response data');
            return { total: 0, thisMonth: [] };
        }
        console.log('Error occured while communicating with api');
        return null;
    })
}

const deactivateStudent = (studentId) => {
    return api.patch(`/students/${studentId}/deactivate`).then((response) => {
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

const activateStudent = (studentId) => {
    return api.patch(`/students/${studentId}/activate`).then((response) => {
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

const studentPursueCourse = (studentId) => {
    return api.patch(`/students/${studentId}/pursue`).then((response) => {
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

const studentGraduateCourse = (studentId) => {
    return api.patch(`/students/${studentId}/graduate`).then((response) => {
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

const autogenerateAdmissionNumber= async (courseId,dateOfAdmission=new Date()) => {
    const date = new Date(dateOfAdmission);
    let url = `/students/autogen-admno?courseId=${courseId}&dateOfAdmission=${date}`;
    return await api.get(url).then((response) => {
        if (response) {
            const {
                data,
                data: { success },
            } = response;

            if (success !== undefined) {
                const courseId = data.data;
                return courseId;
            }
            console.log('No response data');
            return undefined;
        }
        console.log('Error occured while communicating with api');
        return undefined;
    })
}

const studentApis = {
    autogenerateAdmissionNumber,
    getStudentsList,
    createNewStudent,
    studentClockIn,
    studentClockOut,
    getMonthAttendanceOverview,
    deactivateStudent,
    activateStudent,
    studentPursueCourse,
    studentGraduateCourse,
    deleteStudent,
}
export default studentApis;