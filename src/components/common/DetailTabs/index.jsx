import * as React from 'react';
import { Grid } from '@mui/material';
import DetailsTabButtons from './components/DetailsTabButtons';

export default function DetailsTabs(props) {
    const { changeActiveTab, activeTab, tabs } = props;
    console.log({changeActiveTab, activeTab, tabs});
    const tabSize = tabs.length ? 12 / tabs.length : 12;
    return (
        <Grid container direction="row">
            {tabs.map(tabElement =>
                <DetailsTabButtons
                    tabId={tabElement.tabId}
                    activeTab={activeTab}
                    changeActiveTab={changeActiveTab}
                    tabIcon={tabElement.tabIcon}
                    key={tabElement.tabId}
                    tabSize={tabSize}
                />
            )}
        </Grid>
    );
}