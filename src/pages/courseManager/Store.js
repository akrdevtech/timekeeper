import React, { createContext, useReducer } from "react";
import CourseReducer from './Reducer'

const today = new Date();
const initialState = {
    coursesList: [],
    refreshCourseList: false,
    selectedCourseId: undefined,
    selectedCourseInfo: undefined,
    selectedCourseAttendance: {
        selectedYear: today.getFullYear(),
        selectedMonth: today.getMonth(),
        selectedMonthAttendance: [],
        selectedDate: null,
        clockedIn: null,
        clockedOut: null,
        totalAttendance: 0,
        thisMonthAttendance: 0,
        refreshAttendanceCalendar: false,
    },
    isAddCourseWizardOpen: false,
    courseListPagination: {
        page: 0,
        limit: 10,
        totalPages: 0,
    },
    snackBarAttributes: {
        open: false,
        severity: "success",
        message: "Course Created Successfully"
    },
    error: null,
    appliedCourseListFilters: {
        status: ['active'],
        search: '',
    },
    filterTrayToggle: false,
    courseDetailsActiveTab: 'basic',//'attendance'
};

const CourseStore = ({ children }) => {
    const [state, dispatch] = useReducer(CourseReducer, initialState);
    return (
        <CourseContext.Provider value={[state, dispatch]}>
            {children}
        </CourseContext.Provider>
    )
};

export const CourseContext = createContext(initialState);
export default CourseStore;