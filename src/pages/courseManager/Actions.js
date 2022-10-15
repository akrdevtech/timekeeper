const CourseActions = {
    COURSE_WIZARD: {
        OPEN: 'OPEN-ADD-COURSE-WIZARD',
        CLOSE: 'CLOSE-ADD-COURSE-WIZARD',
        ADD_COURSE: {
            SUCCESS: 'ADD-COURSE-WIZARD-SUCCESS-ADD-COURSE',
            FAILURE: 'ADD-COURSE-WIZARD-FAILURE-ADD-COURSE'
        }
    },
    COURSE_LIST_PAGINATION: {
        UPDATE: 'UPDATE-COURSE-LIST-PAGINATION',
        INCREMENT: 'INCREMENT-COURSE-LIST-PAGINATION',
        DECREMENT: 'DECREMENT-COURSE-LIST-PAGINATION',
    },
    COURSES_LIST: {
        GET_UPDATED: 'GET-UPDATED-COURSE-LIST',
        SELECT_COURSE: 'SET-SELECTED-COURSE',
    },
    SNACK_BAR: {
        OPEN: 'OPEN-SNACK-BAR',
        CLOSE: 'CLOSE-SNACK-BAR',
    },
    COURSE_LIST_FILTER_TRAY: {
        TOGGLE: 'TOGGLE-COURSE-LIST-FILTER-TRAY',
        APPLY_FILTERS: 'APPLY-FILTERS-FROM-COURSE-FILTER-TRAY'
    },
    COURSE_DETAILS: {
        ENROLLMENTS: {
            GET_UPDATED_ENROLLMENTS: 'COURSE-DETAILS-GET-UPDATED-ENROLLMENTS'
        },
        CHANGE_TABS: 'CHANGE-COURSE-DETAILS-TAB',
        CLOCK_IN: 'COURSE-CLOCK-IN',
        CLOCK_OUT: 'COURSE-CLOCK-OUT',
        ACCOUNT: {
            DEACTIVATE: 'COURSE-ACCOUNT-DEACTIVATE',
            ACTIVATE: 'COURSE-ACCOUNT-ACTIVATE',
            PURSUE: 'COURSE-ACCOUNT-PURSUE-COURSE',
            GRADUATE: 'COURSE-ACCOUNT-GRADUATE-COURSE',
        },
        ATTENDANCE_CALENDAR: {
            CHANGE_YEAR: 'ATTENDANCE-CALENDAR-CHANGE-YEAR',
            CHANGE_MONTH: 'ATTENDANCE-CALENDAR-CHANGE-MONTH',
            SET_ATTENDANCE: 'SET-ATTENDANCE-FOR-GIVEN-MONTH',
            SELECT_DATE: 'ATTENDANCE-CALENDAR-SELECT-DATE',
            DELETE_ATTENDANCE: 'ATTENDANCE-CALENDAR-DELETE-ATTENDANCE',
            INSERT_ATTENDANCE: 'ATTENDANCE-CALENDAR-INSERT-ATTENDANCE'
        },
    }
}

export default CourseActions;