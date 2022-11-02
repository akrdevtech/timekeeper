import React from 'react'
import StyledMenu from './StyledMenu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddChildIcon from '../../../../../components/icons/AddChildIcon';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import CourseSyllabusEnums from '../Enums';


const OverviewActionMenus = ({ anchorEl, open, handleSelectMenu, handleClose }) => {

    const { overviewActions: actions } = CourseSyllabusEnums;
    return (
        <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={() => handleSelectMenu(actions.EDIT)} disableRipple>
                <EditIcon />
                Edit
            </MenuItem>
            <MenuItem onClick={() => handleSelectMenu(actions.DELETE)} disableRipple>
                <DeleteOutlineIcon />
                Delete
            </MenuItem>

            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={() => handleSelectMenu(actions.ADD_CHILD)} disableRipple>
                <AddChildIcon />
                Add Child
            </MenuItem>
            <MenuItem onClick={() => handleSelectMenu(actions.ADD_SIBLING)} disableRipple>
                <PlaylistAddIcon />
                Add Sibling
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem onClick={() => handleSelectMenu(actions.ARRANGE_CHILDREN)} disableRipple>
                <ImportExportIcon />
                Arrange Children
            </MenuItem>

        </StyledMenu>
    );
}

export default OverviewActionMenus