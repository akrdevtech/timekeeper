import * as React from 'react';
import { alpha, styled, useTheme } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AdjustIcon from '@mui/icons-material/Adjust';


const StyledTreeItem = styled((props) => {
    const theme = useTheme();
    return (<TreeItem {...props} sx={{ color: theme.palette.text.secondary }} />)
})(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));

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
                },
            ],
        },
    ],
};


const renderTree = (nodes) => (
    <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={()=>console.log(nodes.id)}>
        {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
    </StyledTreeItem>
);

export default function SyllabusTree() {
    return (
        <TreeView
            aria-label="customized"
            defaultExpanded={['1']}
            defaultCollapseIcon={<RemoveCircleOutlineIcon />}
            defaultExpandIcon={<AddCircleOutlineIcon />}
            defaultEndIcon={<AdjustIcon />}
            sx={{ flexGrow: 1, overflowY: 'scroll', maxHeight: '70vh', height: '70vh' }}
        >
            {renderTree(data)}
        </TreeView>
    );
}
