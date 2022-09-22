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
    STUNDENT_LIST_FILTER_TRAY:{
        TOGGLE: 'TOGGLE-STUDENT-LIST-FILTER-TRAY',
        APPLY_FILTERS: 'APPLY-FILTERS-FROM-STUDENT-FILTER-TRAY'
    },
    STUDENT_DETAILS:{
        CHANGE_TABS : 'CHANGE-STUDENT-DETAILS-TAB',
        CLOCK_IN: 'STUDENT-CLOCK-IN',
        CLOCK_OUT: 'STUDENT-CLOCK-OUT',
    }
}

export default StudentActions;