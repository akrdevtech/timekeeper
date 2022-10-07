import { Button, Grid, useTheme } from '@mui/material'
import React from 'react'

const DetailsTabButtons = ({ tabId, activeTab, changeActiveTab, tabIcon, tabSize }) => {
    const theme = useTheme()
    const activeTabTheme = { borderBottomStyle: 'solid', borderBottomColor: theme.palette.primary.main, borderBottomWidth: 2 }
    return (
        <Grid item xs={12} lg={tabSize} sx={activeTab === tabId ? activeTabTheme : {}}>
            <Button
                size="small"
                variant="text"
                fullWidth
                onClick={() => { changeActiveTab(tabId) }}
                sx={{ color: activeTab === tabId ? "primary" : theme.palette.text.secondary }}
            >
                {tabIcon}
            </Button>
        </Grid>
    )
}

export default DetailsTabButtons