const tabIds = {
    BASIC_INFO: "basicInfo",
}

const stepStatus = {
    SUCCESS: "success",
    PENDING: "pending",
    ERROR: "error"
}

const stepperSteps = [
    {
        step: 1,
        label: "BASIC INFO",
        status: stepStatus.PENDING,
        isActive: true,
        tabId: tabIds.BASIC_INFO,
    },
];

const basicInfoDefaultData = {
    courseId: '',
    courseName: '',
    duration: 0,
    fee: 0,
    totalCredits: 0,
    minCredits: 0,
    syllabus: undefined
}


const defaultErrorObject = {
    basicInfo: [],
}

const AddCourseWizardData = {
    tabIds,
    stepStatus,
    stepperSteps,
    basicInfoDefaultData,
    defaultErrorObject,
}

export default AddCourseWizardData