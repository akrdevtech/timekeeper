import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
        theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[800];
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        },
    };
}); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

export default function BreadcrumbsNavigation(props) {
    const { handleClick, crumbs } = props;
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {crumbs.map(crumb => (
                <StyledBreadcrumb
                    component="a"
                    href={crumb.link || '#'}
                    label={crumb.label}
                    icon={crumb.icon}
                    onClick={() => handleClick(crumb.link)}
                />
            ))}
        </Breadcrumbs>
    );
}