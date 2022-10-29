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
                    children: 0,
                    title: "this is title 4",
                    contents: "this is a text"
                },
            ],
        },
    ]
};


const renderTree = (nodes, selectContent) => (
    <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={() => selectContent(nodes)}>
        {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node, selectContent))
            : null}
    </StyledTreeItem>
);

export default function EditorSyllabusTree({ values, selectContent }) {
    const [expanded, setExpanded] = React.useState([]);
    const [selected, setSelected] = React.useState([]);

    const treeValues = values || data;

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    const handleSelect = (event, nodeIds) => {
        setSelected(nodeIds);
    };

    return (
        <TreeView
            aria-label="customized"
            defaultExpanded={['1']}
            expanded={expanded}
            selected={selected}
            onNodeToggle={handleToggle}
            onNodeSelect={handleSelect}
            defaultCollapseIcon={<RemoveCircleOutlineIcon />}
            defaultExpandIcon={<AddCircleOutlineIcon />}
            defaultEndIcon={<AdjustIcon />}
            sx={{ flexGrow: 1, overflowY: 'scroll', maxHeight: '100%', height: '100%', paddingTop: 2 }}
        >
            {renderTree(treeValues, selectContent)}
        </TreeView>
    );
}
