const StudentActions = {
    STUDENT_WIZARD: {
        OPEN: 'OPEN-ADD-STUDENT-WIZARD',
        CLOSE: 'CLOSE-ADD-STUDENT-WIZARD',
        ADD_STUDENT: {
            SUCCESS: 'ADD-STUDENT-WIZARD-SUCCESS-ADD-STUDENT',
            FAILURE: 'ADD-STUDENT-WIZARD-SUCCESS-ADD-STUDENT'
        }
    },
    STUDENT_LIST_PAGINATION: {
        UPDATE: 'UPDATE-STUDENT-LIST-PAGINATION',
        INCREMENT: 'INCREMENT-STUDENT-LIST-PAGINATION',
        DECREMENT: 'DECREMENT-STUDENT-LIST-PAGINATION',
    },
    STUDENTS_LIST: {
        GET_UPDATED: 'GET-UPDATED-STUDENT-LIST',
        SELECT_STUDENT: 'SET-SELECTED-STUDENT',
    },
    SNACK_BAR: {
        OPEN: 'OPEN-SNACK-BAR',
        CLOSE: 'CLOSE-SNACK-BAR',
    },
    STUDENT_LIST_FILTER_TRAY: {
        TOGGLE: 'TOGGLE-STUDENT-LIST-FILTER-TRAY',
        APPLY_FILTERS: 'APPLY-FILTERS-FROM-STUDENT-FILTER-TRAY'
    },
    STUDENT_DETAILS: {
        CHANGE_TABS: 'CHANGE-STUDENT-DETAILS-TAB',
        CLOCK_IN: 'STUDENT-CLOCK-IN',
        CLOCK_OUT: 'STUDENT-CLOCK-OUT',
        ACCOUNT: {
            DEACTIVATE: 'STUDENT-ACCOUNT-DEACTIVATE',
            ACTIVATE: 'STUDENT-ACCOUNT-ACTIVATE',
            PURSUE: 'STUDENT-ACCOUNT-PURSUE-COURSE',
            GRADUATE: 'STUDENT-ACCOUNT-GRADUATE-COURSE',
            REMOVE: 'STUDENT-ACCOUNT-REMOVE',
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

export default StudentActions;