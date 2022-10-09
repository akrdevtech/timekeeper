import React, { useState } from 'react'
import { Dialog, Grid, IconButton, } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import WizardStudentContactInfo from './components/WizardStudentContactInfo';
import WizardStudentBasicInfo from './components/WizardStudentBasicInfo';
import WizardStudentCourseInfo from './components/WizardStudentCourseInfo';
import WizardStudentGaurdianInfo from './components/WizardStudentGaurdianInfo';
import AddStudentWizardData from "./components/data";
import AddStudentWizardSchemas from "./components/schema";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import VerticalLinearStepper from '../../../../components/common/VerticalLinearStepper';

const AddStudentWizard = props => {
    const { open, handleClose, handleCreateNewStudent } = props;

    const {
        stepperSteps: defaultSteps,
        tabIds: defaultTabIds,
        stepStatus: defaultStatus,
        basicInfoDefaultData,
        contactInfoDefaultData,
        courseInfoDefaultData,
        gaurdianInfoDefaultData,
        defaultErrorObject
    } = AddStudentWizardData;

    const {
        basicInfoSchema,
        contactInfoSchema,
        courseInfoSchema,
        gaurdianInfoSchema
    } = AddStudentWizardSchemas;

    const [hasVerified, setHasVerified] = useState(false);
    const [basicInfo, setBasicInfo] = useState(basicInfoDefaultData);
    const [contactInfo, setContactInfo] = useState(contactInfoDefaultData);
    const [courseInfo, setCourseInfo] = useState(courseInfoDefaultData);
    const [gaurdianInfo, setGaurdianInfo] = useState(gaurdianInfoDefaultData);

    const [steps, setSteps] = useState(defaultSteps)
    const [validationErrorsObject, setValidationErrors] = useState(defaultErrorObject)
    const [activeTab, setActiveTab] = React.useState(defaultTabIds.BASIC_INFO);

    const validateThisTab = (thisTabId) => {
        switch (thisTabId) {
            case defaultTabIds.BASIC_INFO: return basicInfoSchema.validate(basicInfo, { abortEarly: false });
            case defaultTabIds.CONTACT_INFO: return contactInfoSchema.validate(contactInfo, { abortEarly: false });
            case defaultTabIds.COURSE_INFO: return courseInfoSchema.validate(courseInfo, { abortEarly: false });
            case defaultTabIds.GAURDIAN_INFO: return gaurdianInfoSchema.validate(gaurdianInfo, { abortEarly: false });
            default: return;
        }
    }

    const handleValidateAll = () => {
        const currentValidationErrors = { ...validationErrorsObject };
        let allPass = true;
        const newSteps = steps.map(step => {
            const thisValidationResult = validateThisTab(step.tabId);
            const thisStep = { ...step }
            if (thisValidationResult.error) {
                allPass = false;
                thisStep.status = defaultStatus.ERROR;
                currentValidationErrors[step.tabId] = thisValidationResult.error.details;
            }
            else {
                thisStep.status = defaultStatus.SUCCESS;
                currentValidationErrors[step.tabId] = []
            }
            return thisStep;
        })
        setHasVerified(allPass);
        setValidationErrors(currentValidationErrors);
        setSteps(newSteps);
    }

    const handleActiveTabChange = (tabId) => {
        const currentValidationErrors = { ...validationErrorsObject };
        if (activeTab !== tabId) {
            const validationResult = validateThisTab(activeTab);
            setActiveTab(tabId);
            const newSteps = steps.map(step => {
                const thisStep = { ...step }
                if (activeTab === step.tabId) {
                    if (validationResult.error) {
                        thisStep.status = defaultStatus.ERROR;
                        currentValidationErrors[step.tabId] = validationResult.error.details;
                    }
                    else {
                        thisStep.status = defaultStatus.SUCCESS;
                        currentValidationErrors[step.tabId] = []
                    }
                }
                if (tabId === step.tabId) {
                    thisStep.isActive = true;
                    return thisStep;
                }
                thisStep.isActive = false;
                return thisStep;
            });
            setValidationErrors(currentValidationErrors);
            setSteps(newSteps);
        }
    }

    const handleResetData = () => {
        setBasicInfo(basicInfoDefaultData);
        setContactInfo(contactInfoDefaultData);
        setCourseInfo(courseInfoDefaultData);
        setGaurdianInfo(gaurdianInfoDefaultData);
        setSteps(defaultSteps);
        setActiveTab(defaultTabIds.BASIC_INFO);
    }

    const createStudent = () => {
        handleCreateNewStudent({ basicInfo, contactInfo, courseInfo, gaurdianInfo })
    }

    const getActiveTabComponent = () => {
        switch (activeTab) {
            case defaultTabIds.BASIC_INFO:
                return <WizardStudentBasicInfo
                    handleActiveTabChange={handleActiveTabChange}
                    basicInfo={basicInfo}
                    setBasicInfo={setBasicInfo}
                    errors={validationErrorsObject.basicInfo}
                />;
            case defaultTabIds.CONTACT_INFO:
                return <WizardStudentContactInfo
                    handleActiveTabChange={handleActiveTabChange}
                    contactInfo={contactInfo}
                    setContactInfo={setContactInfo}
                    errors={validationErrorsObject.contactInfo}
                />;
            case defaultTabIds.COURSE_INFO:
                return <WizardStudentCourseInfo
                    handleActiveTabChange={handleActiveTabChange}
                    courseInfo={courseInfo}
                    setCourseInfo={setCourseInfo}
                    errors={validationErrorsObject.courseInfo}
                    activeTab={activeTab}
                />;
            case defaultTabIds.GAURDIAN_INFO:
                return <WizardStudentGaurdianInfo
                    handleActiveTabChange={handleActiveTabChange}
                    gaurdianInfo={gaurdianInfo}
                    setGaurdianInfo={setGaurdianInfo}
                    handleValidateAll={handleValidateAll}
                    createStudent={createStudent}
                    hasVerified={hasVerified}
                    errors={validationErrorsObject.gaurdianInfo}
                />;
            default: return;
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" >
            <Grid container direction="row" justifyContent="center" alignItems='center' sx={{ minHeight: 600 }}>
                <Grid item lg={4} sx={{ backgroundColor: "#fff" }}>
                    <VerticalLinearStepper steps={steps} handleActiveTabChange={handleActiveTabChange} title="ADD STUDENT"/>
                </Grid>
                <Grid item lg={8} sx={{ backgroundColor: "#F5F8FB", minHeight: 600 }}>
                    <Grid container direction="row" justifyContent="center" alignItems="center">
                        <Grid item xs={12}>
                            <IconButton
                                sx={{ float: "right" }}
                                color="error"
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                            <IconButton
                                sx={{ float: "right" }}
                                color="secondary"
                                onClick={handleResetData}
                            >
                                <RestartAltIcon />
                            </IconButton>
                        </Grid>
                        {getActiveTabComponent()}
                    </Grid>
                </Grid>
            </Grid>

        </Dialog >
    )
}

AddStudentWizard.propTypes = {}

export default AddStudentWizard