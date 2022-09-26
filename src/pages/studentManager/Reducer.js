import StudentActions from './Actions'

const StudentReducer = (state, action) => {
    switch (action.type) {
        case StudentActions.STUDENT_WIZARD.OPEN:
            return {
                ...state,
                isAddStudentWizardOpen: true
            };
        case StudentActions.STUDENT_WIZARD.CLOSE:
            return {
                ...state,
                isAddStudentWizardOpen: false
            };
        case StudentActions.STUDENT_LIST_PAGINATION.UPDATE:
            return {
                ...state,
                studentListPagination: action.payload
            };
        case StudentActions.STUDENT_LIST_PAGINATION.INCREMENT:
            return {
                ...state,
                studentListPagination: {
                    ...state.studentListPagination,
                    page: state.studentListPagination.page + 1
                }
            };
        case StudentActions.STUDENT_LIST_PAGINATION.DECREMENT:
            return {
                ...state,
                studentListPagination: {
                    ...state.studentListPagination,
                    page: state.studentListPagination.page - 1
                }
            };
        case StudentActions.STUDENTS_LIST.GET_UPDATED:
            return {
                ...state,
                studentListPagination: action.payload.pagination,
                studentsList: action.payload.studentsList,
                refreshStudentList: action.payload.refreshStudentList,
            };
        case StudentActions.STUDENT_WIZARD.ADD_STUDENT.SUCCESS:
            return {
                ...state,
                studentListPagination: action.payload.pagination,
                studentsList: action.payload.studentsList,
                snackBarAttributes: {
                    open: true,
                    severity: "success",
                    message: "Student Created Successfully"
                },
                isAddStudentWizardOpen: false
            };
        case StudentActions.STUDENT_WIZARD.ADD_STUDENT.FAILURE:
            return {
                ...state,
                snackBarAttributes: {
                    open: true,
                    severity: "error",
                    message: "Student Creation Failed"
                },
            };
        case StudentActions.SNACK_BAR.OPEN:
            return {
                ...state,
                snackBarAttributes: {
                    open: true,
                    severity: action.payload.severity,
                    message: action.payload.message,
                },
            };
        case StudentActions.SNACK_BAR.CLOSE:
            return {
                ...state,
                snackBarAttributes: {
                    ...state.snackBarAttributes,
                    open: false,
                },
            };
        case StudentActions.STUDENTS_LIST.SELECT_STUDENT:
            return {
                ...state,
                selectedStudentId: action.payload.selectedStudentId,
                selectedStudentInfo: action.payload.selectedStudentInfo,
                studentDetailsActiveTab: action.payload.activeTabName,
                selectedStudentAttendance: {
                    selectedYear: new Date().getFullYear(),
                    selectedMonth: new Date().getMonth(),
                    selectedMonthAttendance: [],
                    selectedDate: null,
                    clockedIn: null,
                    clockedOut: null,
                    totalAttendance: 0,
                    thisMonthAttendance: 0,
                }
            };
        case StudentActions.STUNDENT_LIST_FILTER_TRAY.TOGGLE:
            return {
                ...state,
                filterTrayToggle: !state.filterTrayToggle,
            }
        case StudentActions.STUNDENT_LIST_FILTER_TRAY.APPLY_FILTERS:
            return {
                ...state,
                filterTrayToggle: false,
                appliedStudentListFilters: {
                    ...state.appliedStudentListFilters,
                    ...action.payload.appliedStudentListFilters,
                }
            }
        case StudentActions.STUDENT_DETAILS.CHANGE_TABS:
            return {
                ...state,
                studentDetailsActiveTab: action.payload.activeTabName,
            }
        case StudentActions.STUDENT_DETAILS.CLOCK_IN:
            return {
                ...state,
                refreshStudentList: true,
                selectedStudentInfo: action.payload.studentData,
                refreshAttendanceCalendar: action.payload.refreshAttendanceCalendar || false,
            }
        case StudentActions.STUDENT_DETAILS.CLOCK_OUT:
            return {
                ...state,
                refreshStudentList: true,
                selectedStudentInfo: action.payload.studentData,
            }
        case StudentActions.STUDENT_DETAILS.ATTENDANCE_CALENDAR.CHANGE_YEAR:
            return {
                ...state,
                selectedStudentAttendance: {
                    ...state.selectedStudentAttendance,
                    selectedYear: action.payload.year
                },
            }
        case StudentActions.STUDENT_DETAILS.ATTENDANCE_CALENDAR.CHANGE_MONTH:
            return {
                ...state,
                selectedStudentAttendance: {
                    ...state.selectedStudentAttendance,
                    selectedMonth: action.payload.month
                },
            }
        case StudentActions.STUDENT_DETAILS.ATTENDANCE_CALENDAR.SET_ATTENDANCE:
            return {
                ...state,
                selectedStudentAttendance: {
                    ...state.selectedStudentAttendance,
                    selectedMonthAttendance: action.payload.selectedMonthAttendance,
                    totalAttendance: action.payload.totalAttendance,
                    selectedDate: action.payload.selectedDate,
                    clockedIn: action.payload.clockedIn,
                    clockedOut: action.payload.clockedOut,
                    thisMonthAttendance: action.payload.thisMonthAttendance,
                    refreshAttendanceCalendar: false,
                },
            }
        case StudentActions.STUDENT_DETAILS.ATTENDANCE_CALENDAR.SELECT_DATE:
            return {
                ...state,
                selectedStudentAttendance: {
                    ...state.selectedStudentAttendance,
                    selectedDate: action.payload.selectedDate,
                    clockedIn: action.payload.clockedIn,
                    clockedOut: action.payload.clockedOut,
                },
            }
        case StudentActions.STUDENT_DETAILS.ATTENDANCE_CALENDAR.DELETE_ATTENDANCE:
            return {
                ...state,
                refreshStudentList: action.payload.refreshStudentList || false,
                selectedStudentInfo: action.payload.selectedStudentInfo || state.selectedStudentInfo,
                selectedStudentAttendance: {
                    ...state.selectedStudentAttendance,
                    refreshAttendanceCalendar: true,
                },
            }
        case StudentActions.STUDENT_DETAILS.ATTENDANCE_CALENDAR.INSERT_ATTENDANCE:
            return {
                ...state,
                selectedStudentAttendance: {
                    ...state.selectedStudentAttendance,
                    refreshAttendanceCalendar: true,
                },
            }
        case StudentActions.STUDENT_DETAILS.ACCOUNT.ACTIVATE:
            return {
                ...state,
                refreshStudentList: true,
                selectedStudentInfo: action.payload.studentData,
            }
        case StudentActions.STUDENT_DETAILS.ACCOUNT.DEACTIVATE:
            return {
                ...state,
                refreshStudentList: true,
                selectedStudentInfo: action.payload.studentData,
            }
        case StudentActions.STUDENT_DETAILS.ACCOUNT.PURSUE:
            return {
                ...state,
                refreshStudentList: true,
                selectedStudentInfo: action.payload.studentData,
            }
        case StudentActions.STUDENT_DETAILS.ACCOUNT.GRADUATE:
            return {
                ...state,
                refreshStudentList: true,
                selectedStudentInfo: action.payload.studentData,
            }
        default:
            return state;
    }
};

export default StudentReducer;