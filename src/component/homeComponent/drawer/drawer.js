import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
// import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FormPropsTextFields from '../form/formAction';
import DataTable from '../tableData/table';
import Dropdown from 'react-bootstrap/Dropdown'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
// import LockIcon from '@mui/icons-material/Lock';
import { ListSiderBar } from '../drawer/listNavBar/listNav';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '../../../common/popover/tooltip';
import { loginOutForm } from '../../redux/feature/auth';
import { makeStyles } from "@material-ui/core/styles";
// import Link from '@mui/material/Link';
import {

    Routes,
    Route,
    Link,
    useLocation,

} from "react-router-dom";
// import { routes } from '../../../routers/router';
import Home_page from '../../../pages/home_page/home_page';
import Finished_Page from '../../../pages/finished_page/finished';
import List_work_Page from '../../../pages/list_work_page/list_work_page';
// import Popover from '../../../common/popover/popover';
import SignIn from '../../loginComponent/login';
import { useSelector, useDispatch } from 'react-redux';
// import AppTopBar from './appBar/appBar';
import HistoryComponent from '../../historyComponent/history';
import Work_Finish_Page from '../../../pages/workFinish_page/work_Finish_page';
import SignUp from '../../signUpComponent/signUpComponent';
import PrivateRouter from '../../privateRouter/privateRouter';
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

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    drawer: {
        flexShrink: 0,
        width: drawerWidth
    },
    drawerPaper: {
        width: drawerWidth
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    toolbar: {
        ...theme.mixins.toolbar,
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3)
    }
}));


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



export default function MiniDrawer() {
    const theme = useTheme();
    // const location = window.location.pathname
    const navigate = useLocation()
    const classes = useStyles();
    // console.log(navigate, 'local');
    // console.log(match, 888);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(true);
    const [colorActiveClick, setColor] = React.useState();
    // const [show, setShow] = React.useState(false);
    // const [target, setTarget] = React.useState(null);
    const authLogin = useSelector((state) => state?.auth?.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        const addWork = loginOutForm()
        localStorage.removeItem('user')

        dispatch(addWork)
        console.log('vô đây r');
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // const handleClick = (event) => {
    //     setShow(!show);
    //     setTarget(event.target);
    // };
    // const handleClick = (event) => {
    //     setShow(!show);
    //     setTarget(event.target);
    // };
    React.useEffect(() => {
        console.log(colorActiveClick, 'vô đây r');
    }, [colorActiveClick])


    React.useEffect(() => {
        if (navigate.pathname === "/login-page" || navigate.pathname === "/sign-up-page") {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }, [navigate.pathname])



    return (
        <Box sx={{ display: 'flex' }}>

            {/* <Outlet /> */}
            <CssBaseline />
            {/* <div> */}
            {/* <Popover show={show} target={target} idUser={authLogin?.Auth} /> */}
            <AppBar position="fixed" open={open} sx={{ bgcolor: "#343a40" }} className={classes.appBar}>
                <Toolbar>
                    {
                        navigate.pathname !== "/login-page" && navigate.pathname !== "/sign-up-page" ?
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
                        {
                            navigate.pathname !== "/login-page" && navigate.pathname !== "/sign-up-page" ?
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search> : null
                        }

                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />

                    <Typography variant="h6" noWrap component="div">

                        {
                            navigate.pathname !== "/login-page" && navigate.pathname !== "/sign-up-page" ?
                                <Box sx={{ display: { md: 'flex', position: 'relative' } }} >
                                    <Tooltip idUser={authLogin?.Auth} />
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
                                            authLogin && authLogin.Auth !== null ? <Link to='/login-page' onClick={() => handleLogout()}><SettingsIcon className='mx-2' />Logout</Link> : <Link to='/login-page'><SettingsIcon className='mx-2' />Login</Link>
                                        }

                                    </Dropdown.Item>
                                    {/* <Link to='/login-page'>Logout</Link> */}
                                </Dropdown.Menu>
                            </Dropdown> :
                            <Box sx={{ display: { md: 'flex' } }}>
                                <button className='btn bg-white'> <Link to='/login-page' ><SettingsIcon className='mx-2' />Login</Link> </button>
                                <button className='btn bg-btn mx-2'><Link to='/sign-up-page' >register</Link></button>
                            </Box>

                    }


                </Toolbar>
            </AppBar>
            {/* </div> */}


            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <List>
                        <Link to='/'><DashboardIcon className='mx-2' />Hệ thống quản lý</Link>
                    </List>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>

                    {

                        ListSiderBar.map((text, index) => {

                            return <Link to={navigate.pathname === "/login-page" ? "" : text?.path} onClick={() => setColor(index)} className={colorActiveClick === index ? "text-black" : ''}>
                                <ListItemButton
                                    className={colorActiveClick === index ? "colorActive" : ''}

                                    key={text?.name}
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
                                        {text.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        }

                        )}
                </List>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <div>
                    <Routes>
                        {/* <PrivateRouter exact path="/" element={<Private Component={User} />} /> */}
                        <Route exact path="/" element={<PrivateRouter>
                            <Home_page />
                        </PrivateRouter>} />
                        <Route exact path="/doashboard-page" element={<PrivateRouter>
                            <Finished_Page />
                        </PrivateRouter>} />
                        <Route exact path="/list-work-page" element={<PrivateRouter>
                            <List_work_Page />
                        </PrivateRouter>} />
                        <Route exact path="/history-page" element={<PrivateRouter>
                            <HistoryComponent />
                        </PrivateRouter>} />
                        <Route exact path="/finished-page" element={<PrivateRouter>
                            <Work_Finish_Page />
                        </PrivateRouter>} />

                        <Route exact path="/sign-up-page" element={
                            <SignUp />
                        } />
                        <Route exact path="/login-page" element={
                            <SignIn />
                        } />


                    </Routes>
                </div>


            </Box>
        </Box>
    );
}
