import CourseActions from './Actions'

const CourseReducer = (state, action) => {
    switch (action.type) {
        case CourseActions.COURSE_WIZARD.OPEN:
            return {
                ...state,
                isAddCourseWizardOpen: true
            };
        case CourseActions.COURSE_WIZARD.CLOSE:
            return {
                ...state,
                isAddCourseWizardOpen: false
            };
        case CourseActions.COURSE_LIST_PAGINATION.UPDATE:
            return {
                ...state,
                courseListPagination: action.payload
            };
        case CourseActions.COURSE_LIST_PAGINATION.INCREMENT:
            return {
                ...state,
                courseListPagination: {
                    ...state.courseListPagination,
                    page: state.courseListPagination.page + 1
                }
            };
        case CourseActions.COURSE_LIST_PAGINATION.DECREMENT:
            return {
                ...state,
                courseListPagination: {
                    ...state.courseListPagination,
                    page: state.courseListPagination.page - 1
                }
            };
        case CourseActions.COURSES_LIST.GET_UPDATED:
            return {
                ...state,
                courseListPagination: action.payload.pagination,
                coursesList: action.payload.coursesList,
                refreshCourseList: action.payload.refreshCourseList,
            };
        case CourseActions.COURSE_WIZARD.ADD_COURSE.SUCCESS:
            return {
                ...state,
                courseListPagination: action.payload.pagination,
                coursesList: action.payload.coursesList,
                snackBarAttributes: {
                    open: true,
                    severity: "success",
                    message: "Course Created Successfully"
                },
                isAddCourseWizardOpen: false
            };
        case CourseActions.COURSE_WIZARD.ADD_COURSE.FAILURE:
            return {
                ...state,
                snackBarAttributes: {
                    open: true,
                    severity: "error",
                    message: "Course Creation Failed"
                },
            };
        case CourseActions.SNACK_BAR.OPEN:
            return {
                ...state,
                snackBarAttributes: {
                    open: true,
                    severity: action.payload.severity,
                    message: action.payload.message,
                },
            };
        case CourseActions.SNACK_BAR.CLOSE:
            return {
                ...state,
                snackBarAttributes: {
                    ...state.snackBarAttributes,
                    open: false,
                },
            };
        case CourseActions.COURSES_LIST.SELECT_COURSE:
            return {
                ...state,
                selectedCourseId: action.payload.selectedCourseId,
                selectedCourseInfo: action.payload.selectedCourseInfo,
                courseDetailsActiveTab: action.payload.activeTabName,
            };
        case CourseActions.COURSE_LIST_FILTER_TRAY.TOGGLE:
            return {
                ...state,
                filterTrayToggle: !state.filterTrayToggle,
            }
        case CourseActions.COURSE_LIST_FILTER_TRAY.APPLY_FILTERS:
            return {
                ...state,
                filterTrayToggle: false,
                refreshCourseList: true,
                appliedCourseListFilters: {
                    ...state.appliedCourseListFilters,
                    ...action.payload.appliedCourseListFilters,
                }
            }
        case CourseActions.COURSE_DETAILS.CHANGE_TABS:
            return {
                ...state,
                courseDetailsActiveTab: action.payload.activeTabName,
            }
        case CourseActions.COURSE_DETAILS.CLOCK_IN:
            return {
                ...state,
                refreshCourseList: true,
                selectedCourseInfo: action.payload.courseData,
                refreshAttendanceCalendar: action.payload.refreshAttendanceCalendar || false,
            }
        case CourseActions.COURSE_DETAILS.CLOCK_OUT:
            return {
                ...state,
                refreshCourseList: true,
                selectedCourseInfo: action.payload.courseData,
            }
        case CourseActions.COURSE_DETAILS.ATTENDANCE_CALENDAR.CHANGE_YEAR:
            return {
                ...state,
                selectedCourseAttendance: {
                    ...state.selectedCourseAttendance,
                    selectedYear: action.payload.year
                },
            }
        case CourseActions.COURSE_DETAILS.ATTENDANCE_CALENDAR.CHANGE_MONTH:
            return {
                ...state,
                selectedCourseAttendance: {
                    ...state.selectedCourseAttendance,
                    selectedMonth: action.payload.month
                },
            }
        case CourseActions.COURSE_DETAILS.ATTENDANCE_CALENDAR.SET_ATTENDANCE:
            return {
                ...state,
                selectedCourseAttendance: {
                    ...state.selectedCourseAttendance,
                    selectedMonthAttendance: action.payload.selectedMonthAttendance,
                    totalAttendance: action.payload.totalAttendance,
                    selectedDate: action.payload.selectedDate,
                    clockedIn: action.payload.clockedIn,
                    clockedOut: action.payload.clockedOut,
                    thisMonthAttendance: action.payload.thisMonthAttendance,
                    refreshAttendanceCalendar: false,
                },
            }
        case CourseActions.COURSE_DETAILS.ATTENDANCE_CALENDAR.SELECT_DATE:
            return {
                ...state,
                selectedCourseAttendance: {
                    ...state.selectedCourseAttendance,
                    selectedDate: action.payload.selectedDate,
                    clockedIn: action.payload.clockedIn,
                    clockedOut: action.payload.clockedOut,
                },
            }
        case CourseActions.COURSE_DETAILS.ATTENDANCE_CALENDAR.DELETE_ATTENDANCE:
            return {
                ...state,
                refreshCourseList: action.payload.refreshCourseList || false,
                selectedCourseInfo: action.payload.selectedCourseInfo || state.selectedCourseInfo,
                selectedCourseAttendance: {
                    ...state.selectedCourseAttendance,
                    refreshAttendanceCalendar: true,
                },
            }
        case CourseActions.COURSE_DETAILS.ATTENDANCE_CALENDAR.INSERT_ATTENDANCE:
            return {
                ...state,
                selectedCourseAttendance: {
                    ...state.selectedCourseAttendance,
                    refreshAttendanceCalendar: true,
                },
            }
        case CourseActions.COURSE_DETAILS.ACCOUNT.ACTIVATE:
            return {
                ...state,
                refreshCourseList: true,
                selectedCourseInfo: action.payload.courseData,
            }
        case CourseActions.COURSE_DETAILS.ACCOUNT.DEACTIVATE:
            return {
                ...state,
                refreshCourseList: true,
                selectedCourseInfo: action.payload.courseData,
            }
        case CourseActions.COURSE_DETAILS.ACCOUNT.PURSUE:
            return {
                ...state,
                refreshCourseList: true,
                selectedCourseInfo: action.payload.courseData,
            }
        case CourseActions.COURSE_DETAILS.ACCOUNT.GRADUATE:
            return {
                ...state,
                refreshCourseList: true,
                selectedCourseInfo: action.payload.courseData,
            }
        case CourseActions.COURSE_DETAILS.ENROLLMENTS.GET_UPDATED_ENROLLMENTS:
            return {
                ...state,
                courseDetailsStudents:{
                    ...state.courseDetailsStudents,
                    studentList:action.payload.studentList,
                    pagination: action.payload.pagination,
                },
            }
        default:
            return state;
    }
};

export default CourseReducer;