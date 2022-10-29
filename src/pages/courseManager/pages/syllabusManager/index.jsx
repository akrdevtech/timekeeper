import { Box, Fab, Grid, Paper, Tab } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PageHeader from '../../../../components/common/PageHeader';
import { CourseContext } from '../../Store';
import EditorSyllabusContent from './components/EditorSyllabusContent';
import EditorSyllabusTree from './components/EditorSyllabusTree';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import userDetailsMissingIcon from "../../../../assets/images/placeholders/userDetailsMissing.svg";
import CourseProfileHeader from '../../components/CourseDetails/components/CourseProfileHeader';
import { CourseSyllabusContext } from './Store';
import Enums from './Enums';
import CourseSyllabusActions from './Actions';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';

const SyllabusManager = () => {
    const breadCrumbs = [
        {
            label: "Home",
            icon: <HomeIcon fontSize='small' />,
            link: '/courses'
        },
        {
            label: "Syllabus",
            icon: <MenuBookIcon fontSize='small' />,
            link: '/courses/syllabus'
        }
    ]

    const [courseState] = useContext(CourseContext);
    const [syllabusState, syllabusDispatch] = useContext(CourseSyllabusContext);

    const { editorMode, activeTab, selectedTopicContents } = syllabusState;

    const { selectedCourseInfo } = courseState;

    const [selectedNode, setSelectedNode] = useState("syllabusContents")

    const [syllabusTree, setSyllabusTree] = useState([]);
    const [editorContents, setEditorContents] = useState(selectedTopicContents);
    const [SelectedSyllabusContentInEditor, setSelectedSyllabusContentInEditor] = useState(null);
    const inputEl = useRef(null);


    const handleSetEditorContents = (editorData) => {
        console.log({ editorData });
        setEditorContents(editorData);
    }
    const selectContent = (node) => {
        console.log(node);
        setSelectedSyllabusContentInEditor(node);
    }

    const saveEditorContents = (data) => {
        syllabusDispatch(
            {
                type: CourseSyllabusActions.SYLLABUS_EDITOR.CONTENTS_SAVE,
                payload: {
                    selectedTopicContents: data
                }
            }
        )
    }


    const handleTabChange = (event, newValue) => {
        console.log(newValue);
        syllabusDispatch(
            {
                type: CourseSyllabusActions.SYLLABUS_DETAILS_TABS.SELECT,
                payload: {
                    newTab: newValue
                }
            }
        )
    };

    const toggleEditorMode = () => {
        let newMode = Enums.editorModes.EDIT;
        if (editorMode === Enums.editorModes.EDIT) {
            newMode = Enums.editorModes.VIEW;
        }
        console.log(selectedTopicContents);

        syllabusDispatch(
            {
                type: CourseSyllabusActions.SYLLABUS_EDITOR.MODE_CHANGE,
                payload: {
                    newMode
                }
            }
        )
    }

    useEffect(() => {
        if (inputEl.current && activeTab === Enums.detailsTabs.CONTENTS) {
            console.log('changing');
            inputEl.current.innerHTML = selectedTopicContents;
        }
    }, [editorMode, selectedTopicContents, activeTab])


    const data = {
        id: 'syllabusContents',
        name: 'Syllabus-Contents',
        children: [
            {
                id: '1',
                name: 'Child - 1',
            },
            {
                id: '3',
                name: 'Child - 3',
                children: [
                    {
                        id: '4',
                        name: 'Child - 4',
                        children: 0,
                        title: "this is title 4",
                        contents: "this is a text"
                    },
                    {
                        id: '5',
                        name: 'Child - 5',
                        children: 0,
                        title: "this is title 5",
                        contents: "this is a text"
                    },
                ],
            },
        ]
    };


    return (
        <Grid container direction="row">
            <Grid item xs={12} lg={8} sx={{ backgroundColor: "#F5F8FB", padding: 2, minHeight: window.innerHeight }}>
                <PageHeader breadCrumbs={breadCrumbs} handleBreadCrumbsClick={() => { }} pageTitle="Course Manager" >
                    <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={2} sx={{ paddingTop: 2 }}>

                        <TabContext value={activeTab}>
                            <Grid item lg={12}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList
                                        onChange={handleTabChange}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                    >
                                        <Tab label="OVERVIEW" value={Enums.detailsTabs.OVERVIEW} />
                                        <Tab label="CONTENTS" value={Enums.detailsTabs.CONTENTS} />
                                        <Tab label="TESTS" value={Enums.detailsTabs.TESTS} />
                                    </TabList>
                                </Box>
                            </Grid>
                            <Grid item lg={12} sx={{ height: '78vh', maxHeight: '78vh', overflowY: 'scroll' }}>
                                <TabPanel value={Enums.detailsTabs.CONTENTS}>
                                    <div
                                        ref={inputEl}
                                        style={{ display: editorMode !== Enums.editorModes.EDIT ? "block" : 'none' }}>
                                    </div>
                                    <div style={{ display: editorMode === Enums.editorModes.EDIT ? "block" : 'none' }}>
                                        <EditorSyllabusContent
                                            value={selectedTopicContents}
                                            setEditorContents={handleSetEditorContents}
                                        />
                                    </div>
                                </TabPanel>
                                <TabPanel value={Enums.detailsTabs.TESTS}>

                                    tests
                                </TabPanel>
                                <TabPanel value={Enums.detailsTabs.OVERVIEW}>

                                    OVERVIEW
                                </TabPanel>
                            </Grid>
                            <Grid item lg={12} >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                >
                                    {editorMode === Enums.editorModes.VIEW ?
                                        (
                                            <Fab color="primary" aria-label="add" onClick={toggleEditorMode}>
                                                <EditIcon />
                                            </Fab>
                                        ) : (
                                            <>

                                                <Fab
                                                    size="small"
                                                    color="primary"
                                                    aria-label="add"
                                                    onClick={() => saveEditorContents(editorContents)}
                                                >
                                                    <SaveIcon />
                                                </Fab>
                                                &nbsp;
                                                <Fab color="error" aria-label="add" onClick={toggleEditorMode}>
                                                    <ClearIcon />
                                                </Fab>
                                            </>
                                        )}
                                </Grid>
                            </Grid>
                        </TabContext>
                    </Grid>
                </PageHeader>
            </Grid>
            <Grid item xs={12} lg={4} sx={{ minHeight: window.innerHeight, backgroundColor: 'white' }}>
                <Paper elevation={0} sx={{ padding: 3, minHeight: window.innerHeight }}>
                    <Grid container direction="row">
                        <Grid item xs={12} lg={12}>
                            {selectedCourseInfo ? (
                                <>
                                    <CourseProfileHeader selectedCourseInfo={selectedCourseInfo} slotPage={"syllabus"} />
                                    <br />
                                    <EditorSyllabusTree selectContent={selectContent} values={data} />
                                </>
                            ) : (
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    sx={{ marginTop: '50%' }}
                                >
                                    <img src={userDetailsMissingIcon} alt="user details missing" />
                                </Grid>
                            )}
                        </Grid>
                    </Grid >
                </Paper>
            </Grid>
        </Grid>
    )
}

export default SyllabusManager