import CourseSyllabusActions from './Actions'

const CourseSyllabusReducer = (state, action) => {
    switch (action.type) {
        case CourseSyllabusActions.SYLLABUS_EDITOR.MODE_CHANGE:
            return {
                ...state,
                editorMode: action.payload.newMode,
            };

        case CourseSyllabusActions.SYLLABUS_EDITOR.CONTENTS_SAVE:
            return {
                ...state,
                selectedTopicContents: action.payload.selectedTopicContents,
            };

        case CourseSyllabusActions.SYLLABUS_DETAILS_TABS.SELECT:
            return {
                ...state,
                activeTab: action.payload.newTab,
            };

        default:
            return state;
    }
};

export default CourseSyllabusReducer;