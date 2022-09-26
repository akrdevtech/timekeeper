import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import TaskOutlinedIcon from '@mui/icons-material/TaskOutlined';
import CalendarMonthOutlined from '@mui/icons-material/CalendarMonthOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function SideAppDrawer(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    // const handleDrawerOpen = () => {
    //     setOpen(true);
    // };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const menuList = [
        { icon: <DashboardOutlinedIcon />, link:'/', text: "Dashboard", blockId: 1 },
        { icon: <PeopleAltOutlinedIcon />, link:'/students',text: "Student Manager", blockId: 1 },
        { icon: <TaskOutlinedIcon />, link:'/grades',text: "Grades Manager", blockId: 1 },
        { icon: <CalendarMonthOutlined />, link:'/attendances',text: "Attendance Manager", blockId: 1 },
        { icon: <TimerOutlinedIcon />, link:'/tasks',text: "Task Manager", blockId: 1 },
        { icon: <NotificationsNoneOutlinedIcon />, link:'/notifications',text: "Notifications Manager", blockId: 2 },
        { icon: <SettingsOutlinedIcon />, link:'/settings',text: "Settings Manager", blockId: 2 },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuList.map(({ icon, text, blockId,link }, index) => (
                        <React.Fragment key={text}>
                            {blockId === 1 && (
                                <Link to={link}>
                                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {icon}
                                            </ListItemIcon>
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            )}
                        </React.Fragment>
                    ))}
                </List>
                <Divider />
                <List>
                    {menuList.map(({ icon, text, blockId }, index) => (
                        <React.Fragment key={text}>
                            {blockId === 2 && (
                                <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                                    <ListItemButton
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 3 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {icon}
                                        </ListItemIcon>
                                    </ListItemButton>
                                </ListItem>
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, minHeight: window.innerHeight, backgroundColor: "#555" }}>
                {/* <DrawerHeader /> */}
                {props.children}
            </Box>
        </Box>
    );
}
