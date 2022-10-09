import { Card, Grid, Avatar, Typography, CardHeader, Badge, useTheme, IconButton } from '@mui/material'
import React from 'react'
import FaceIcon from '@mui/icons-material/Face';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const CourseDeatilsStudentItem = (props) => {
    const theme = useTheme();
    const { studentInfo, handleSelectStudentId } = props;
    const cardStyle = {
        minWidth: 275,
        boxShadow: "none",
        borderRadius: 2,
        backgroundColor: theme.palette.common.white,
        color: "textSecondary"
    }
    return (
        <Card sx={cardStyle}>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item xs={12} lg={6}>
                    <CardHeader
                        avatar={
                            <Badge overlap="circular" variant="dot" color={studentInfo.isPresent ? "success" : "error"}>
                                <Avatar aria-label="recipe" sx={{ borderStyle: 'solid', borderWidth: 2 }}>
                                    {studentInfo.name ? <b>{studentInfo.name[0]}</b> : <FaceIcon />}
                                </Avatar>
                            </Badge>
                        }
                        title={(<Typography variant='body2' color="secondary"><b>{studentInfo.name}</b></Typography>)}
                        subheader={(<Typography variant='caption'>{studentInfo.courseInfo.admissionNumber}</Typography>)}
                    />
                </Grid>
                <Grid item xs={12} lg={6}>
                    <CardHeader

                        title={(<Typography variant='caption'>{studentInfo.contactInfo.phone}</Typography>)}
                        subheader={(
                            <OpenInNewIcon
                                fontSize='small' sx={{ float: 'right', cursor: 'pointer' }}
                                onClick={() => handleSelectStudentId(studentInfo.id)}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </Card>
    )
}

export default CourseDeatilsStudentItem