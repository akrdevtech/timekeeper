import React, { useState } from 'react'
import { Dialog, Grid, IconButton, } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import WizardCourseBasicInfo from './components/WizardCourseBasicInfo';
import AddCourseWizardData from "./components/data";
import AddStudentWizardSchemas from "./components/schema";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import VerticalLinearStepper from '../../../../components/common/VerticalLinearStepper';

const AddCourseWizard = props => {
    const { open, handleClose, handleCreateNewCourse } = props;

    const {
        stepperSteps: defaultSteps,
        tabIds: defaultTabIds,
        stepStatus: defaultStatus,
        basicInfoDefaultData,
        defaultErrorObject
    } = AddCourseWizardData;

    const {
        basicInfoSchema,
    } = AddStudentWizardSchemas;

    const [hasVerified, setHasVerified] = useState(false);
    const [basicInfo, setBasicInfo] = useState(basicInfoDefaultData);

    const [steps, setSteps] = useState(defaultSteps)
    const [validationErrorsObject, setValidationErrors] = useState(defaultErrorObject)
    const [activeTab, setActiveTab] = React.useState(defaultTabIds.BASIC_INFO);

    const validateThisTab = (thisTabId) => {
        switch (thisTabId) {
            case defaultTabIds.BASIC_INFO: return basicInfoSchema.validate(basicInfo, { abortEarly: false });
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
        setSteps(defaultSteps);
        setActiveTab(defaultTabIds.BASIC_INFO);
    }

    const createCourse = () => {
        handleCreateNewCourse({ basicInfo })
    }

    const getActiveTabComponent = () => {
        switch (activeTab) {
            case defaultTabIds.BASIC_INFO:
                return <WizardCourseBasicInfo
                    handleActiveTabChange={handleActiveTabChange}
                    basicInfo={basicInfo}
                    setBasicInfo={setBasicInfo}
                    errors={validationErrorsObject.basicInfo}
                    createCourse={createCourse}
                    handleValidateAll={handleValidateAll}
                    hasVerified={hasVerified}
                />;
            default: return;
        }
    }

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg" >
            <Grid container direction="row" justifyContent="center" alignItems='center' sx={{ minHeight: 600 }}>
                <Grid item lg={4} sx={{ backgroundColor: "#fff" }}>
                    <VerticalLinearStepper steps={steps} handleActiveTabChange={handleActiveTabChange} title="ADD COURSE"/>
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

AddCourseWizard.propTypes = {}

export default AddCourseWizard