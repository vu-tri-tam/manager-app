import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
// import FormPropsTextFields from '../form/formAction';
// import DataTable from '../tableData/table';
import Dropdown from 'react-bootstrap/Dropdown'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import LockIcon from '@mui/icons-material/Lock';
// import { OverlayTrigger, Popover, Button } from 'react-bootstrap'
import Popovers from '../../../../common/popover/popover';
import {


    Link,


} from "react-router-dom";
import ArrowTooltips from '../../../../common/popover/tooltip';
import Tooltip from '../../../../common/popover/tooltip';
import FadeMenu from '../../../../common/popover/tooltip';

export default function AppTopBar({ authLogin, navigate }) {
    // const navigate = useLocation()
    const drawerWidth = 240;
    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [show, setShow] = React.useState(false);
    // const [target, setTarget] = React.useState(null);
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));


    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const menuId = 'primary-search-account-menu';

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
                {
                    navigate.pathname !== "/login-page" ?
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton> : <LockIcon />
                }


                <Typography variant="h6" noWrap component="div">

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Typography>
                <Box sx={{ flexGrow: 1 }} />

                <Typography variant="h6" noWrap component="div">

                    {
                        navigate.pathname !== "/login-page" ?
                            <Box sx={{ display: { md: 'flex', position: 'relative' } }} >
                                <FadeMenu idUser={authLogin?.Auth} />
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    <Badge badgeContent={17} color="error">
                                        <NotificationsIcon />
                                    </Badge>
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >


                                </IconButton>

                            </Box> : null

                    }
                    {/* <!-- Bottom tooltip--> */}

                </Typography>



                {
                    authLogin && authLogin.Auth !== null ?
                        <Dropdown className="d-inline mx-2">
                            <Dropdown.Toggle id="dropdown-autoclose-true">
                                <AccountCircle />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#"><ExitToAppIcon className='mx-2' />Setting Account</Dropdown.Item>
                                <Dropdown.Item href="#">
                                    {
                                        authLogin && authLogin.Auth !== null ? <Link to='/login-page'><SettingsIcon className='mx-2' />Logout</Link> : <Link to='/login-page'><SettingsIcon className='mx-2' />Login</Link>
                                    }

                                </Dropdown.Item>
                                {/* <Link to='/login-page'>Logout</Link> */}
                            </Dropdown.Menu>
                        </Dropdown> :
                        <Box sx={{ display: { md: 'flex' } }}>
                            <button className='btn'> <Link to='/login-page'><SettingsIcon className='mx-2' />Login</Link> </button>
                            <button className='btn btn-success'>register</button>
                        </Box>

                }


            </Toolbar>
        </AppBar>
    )
}
