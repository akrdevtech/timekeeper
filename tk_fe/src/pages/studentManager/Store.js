import React, { createContext, useReducer } from "react";
import StudentReducer from './Reducer'


const initialState = {
    studentsList: [],
    selectedStudentId: undefined,
    selectedStudentInfo: undefined,
    isAddStudentWizardOpen: false,
    studentListPagination: {
        page: 0,
        limit: 14,
        totalPages: 0,
    },
    snackBarAttributes: {
        open: false,
        severity: "success",
        message: "Student Created Successfully"
    },
    error: null,
    appliedStudentListFilters: {
        admission: 'active',
        graduation: 'ongoing',
        presence: 'any',
        course: 'any',
        search: '',
    },
    filterTrayToggle: false,
    studentDetailsActiveTab: 'attendance'//'profile'
};

const StudentStore = ({ children }) => {
    const [state, dispatch] = useReducer(StudentReducer, initialState);
    return (
        <StudentContext.Provider value={[state, dispatch]}>
            {children}
        </StudentContext.Provider>
    )
};

export const StudentContext = createContext(initialState);
export default StudentStore;