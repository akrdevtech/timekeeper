import React, { createContext, useReducer } from "react";
import CourseSyllabusReducer from './Reducer'
import Enums from "./Enums";

const initialState = {
    activeTab: Enums.detailsTabs.OVERVIEW,
    editorMode: Enums.editorModes.VIEW,
    selectedNode: Enums.syllabusTree.DEFAULT_ROOT,
    selectedTopicContents : "",
};

const CourseSyllabusStore = ({ children }) => {
    const [state, dispatch] = useReducer(CourseSyllabusReducer, initialState);
    return (
        <CourseSyllabusContext.Provider value={[state, dispatch]}>
            {children}
        </CourseSyllabusContext.Provider>
    )
};

export const CourseSyllabusContext = createContext(initialState);
export default CourseSyllabusStore;