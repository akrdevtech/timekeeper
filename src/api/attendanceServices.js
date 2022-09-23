import api from "./httpApi";

const insertNewAttendance = (studentId, clockedInAt, clockedOutAt) => {
    return api.post(
        `/attendance`,
        {
            studentId,
            clockedInAt: new Date(clockedInAt),
            clockedOutAt: clockedOutAt ? new Date(clockedOutAt) : null,
        }
    ).then((response) => {
        if (response) {
            const {
                data,
                data: { success },
            } = response;

            if (success !== undefined) {
                const attendanceInfo = data.data;
                return attendanceInfo;
            }
            console.log('No response data');
            return {};
        }
        console.log('Error occured while communicating with api');
        return null;
    })
}

const updateAttendance = (studentId, clockedInAt, clockedOutAt, attendanceId) => {
    return api.patch(
        `/attendance/${attendanceId}`,
        {
            studentId,
            clockedInAt: new Date(clockedInAt),
            clockedOutAt: clockedOutAt ? new Date(clockedOutAt) : null,
        }
    ).then((response) => {
        if (response) {
            const {
                data,
                data: { success },
            } = response;

            if (success !== undefined) {
                const attendanceInfo = data.data;
                return attendanceInfo;
            }
            console.log('No response data');
            return {};
        }
        console.log('Error occured while communicating with api');
        return null;
    })
}

const deleteAttendance = (attendanceId) => {
    return api.delete(`/attendance/${attendanceId}`).then((response) => {
        if (response) {
            const {
                data,
                data: { success },
            } = response;

            if (success !== undefined) {
                const attendanceInfo = data.data;
                return attendanceInfo;
            }
            console.log('No response data');
            return {};
        }
        console.log('Error occured while communicating with api');
        return null;
    })
}

const upsertAttendance = (studentId, clockedInAt, clockedOutAt, attendanceId) => {
    if (!attendanceId) {
        return insertNewAttendance(studentId, clockedInAt, clockedOutAt);
    }
    return updateAttendance(studentId, clockedInAt, clockedOutAt, attendanceId);
}



const attendanceApis = {
    insertNewAttendance,
    updateAttendance,
    upsertAttendance,
    deleteAttendance,
}
export default attendanceApis;