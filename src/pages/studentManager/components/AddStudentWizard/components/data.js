import dateHelpers from "../../../../../utils/dateHelpers";

const tabIds = {
    BASIC_INFO: "basicInfo",
    CONTACT_INFO: "contactInfo",
    COURSE_INFO: "courseInfo",
    GAURDIAN_INFO: "gaurdianInfo",
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
    {
        step: 2,
        label: "CONTACT INFO",
        status: stepStatus.PENDING,
        isActive: false,
        tabId: tabIds.CONTACT_INFO,
    },
    {
        step: 3,
        label: "COURSE INFO",
        status: stepStatus.PENDING,
        isActive: false,
        tabId: tabIds.COURSE_INFO,
    },
    {
        step: 4,
        label: "GAURDIAN INFO",
        status: stepStatus.PENDING,
        isActive: false,
        tabId: tabIds.GAURDIAN_INFO,
    }
];

const basicInfoDefaultData = {
    name: '',
    gender: '',
    dateOfBirth: dateHelpers.createDate(new Date(), 0, 0, -18),
    occupation: '',
}

const contactInfoDefaultData = {
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    pin: '',
}

const courseInfoDefaultData = {
    course: '',
    dateOfAdmission: new Date(),
    admissionNumber: '',
}

const gaurdianInfoDefaultData = {
    nameOfGaurdian: '',
    phoneOfGaurdian: '',
}

const defaultErrorObject = {
    basicInfo: [],
    contactInfo: [],
    courseInfo: [],
    gaurdianInfo: [],
}

const AddStudentWizardData = {
    tabIds,
    stepStatus,
    stepperSteps,
    basicInfoDefaultData,
    contactInfoDefaultData,
    courseInfoDefaultData,
    gaurdianInfoDefaultData,
    defaultErrorObject,
}

export default AddStudentWizardData