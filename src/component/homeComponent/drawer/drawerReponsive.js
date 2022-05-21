import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ListSiderBar } from './listNavBar/listNav';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '../../../common/popover/tooltip';
import Badge from '@mui/material/Badge';
import { loginOutForm } from '../../redux/feature/auth';
import {

    Routes,
    Route,
    Link,
    useLocation,

} from "react-router-dom";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Dropdown from 'react-bootstrap/Dropdown'
import { useSelector, useDispatch } from 'react-redux';
import LockIcon from '@mui/icons-material/Lock';
import InputBase from '@mui/material/InputBase';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItemButton from '@mui/material/ListItemButton';
import Home_page from '../../../pages/home_page/home_page';
import Finished_Page from '../../../pages/finished_page/finished';
import List_work_Page from '../../../pages/list_work_page/list_work_page';
import Account_Page from '../../../pages/account_Page/account_page';
import NotFinish_Page from '../../../pages/notFinish_Page/notFinish_page';
// import Popover from '../../../common/popover/popover';
import SignIn from '../../loginComponent/login';
// import { useSelector, useDispatch } from 'react-redux';
// import AppTopBar from './appBar/appBar';
import HistoryComponent from '../../historyComponent/history';
import Work_Finish_Page from '../../../pages/workFinish_page/work_Finish_page';
import SignUp from '../../signUpComponent/signUpComponent';
import PrivateRouter from '../../privateRouter/privateRouter';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FadeMenuMobile from './toolTipMobile/toolTipMobile';
import LoginApi from '../../../api/login/loginApi';

let drawerWidthProp = 235;
// interface Props {
//     /**
//      * Injected by the documentation to work in an iframe.
//      * You won't need it on your project.
//      */
//     window?: () => Window;
// }

export default function ResponsiveDrawer(props) {
    const { window } = props;
    const theme = useTheme();
    const navigate = useLocation()
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [user, setUser] = React.useState([]);
    const [colorActiveClick, setColor] = React.useState();
    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const authLogin = useSelector((state) => state?.auth?.auth);
    const dispatch = useDispatch();
    let drawerWidth = React.useRef(drawerWidthProp);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const menuId = 'primary-search-account-menu';
    const handleLogout = () => {
        const addWork = loginOutForm()
        localStorage.removeItem('user')

        dispatch(addWork)

    }


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    // const handleClick = (event) => {
    //     setShow(!show);
    //     setTarget(event.target);
    // };
    // const handleClick = (event) => {
    //     setShow(!show);
    //     setTarget(event.target);
    // };

    React.useEffect(() => {
        const getUser = () => {
            LoginApi.getUserLogin()?.then((res) => res?.data?.accessToken.filter((ele) => ele._id === authLogin?.Auth)).then((elementFilter) => setUser(elementFilter))

        }
        getUser()

    }, [])

    // console.log(drawerWidth.current, 'op');
    React.useEffect(() => {

        if (navigate.pathname !== "/login-page" || navigate.pathname !== "/sign-up-page") {
            return drawerWidth.current = 250
        } else {
            return drawerWidth.current = 0

        }
    }, [navigate.pathname])

    const drawer = (
        <div className='m-2'>
            {/* <Toolbar /> */}
            <List className='m-2'>
                <Link to='/'><DashboardIcon className='mx-2' />Hệ thống quản lý</Link>
            </List>
            <Divider />

            <List>

                {
                    ListSiderBar.map((text, index) => (
                        <Link to={navigate.pathname === "/login-page" ? "" : text?.path} onClick={() => setColor(index)} className={colorActiveClick === index ? "text-black" : ''}>
                            <ListItem button key={text?.name}
                                className={colorActiveClick === index ? "colorActive" : ''}

                            >
                                <ListItemIcon style={{ minWidth: "30px" }}>
                                    {text.icon}
                                </ListItemIcon>
                                <ListItemText primary={text.name} />
                            </ListItem>
                        </Link>

                    ))}
            </List>
            {/* <Divider /> */}
            {/* <List>
                {ListSiderBar2.map((text, index) => (
                    <Link to={navigate.pathname === "/login-page" ? "" : text?.path} onClick={() => setColor(index)} className={colorActiveClick === index ? "text-black" : ''}>
                        <ListItem button key={text?.className} className={colorActiveClick === index ? "colorActive" : ''}>
                            <ListItemIcon>
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText primary={text.name} />
                        </ListItem>
                    </Link>
                ))}
            </List> */}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                open={open}
                position="fixed"
                sx={{
                    width: { sm: navigate.pathname !== "/login-page" && navigate.pathname !== "/sign-up-page" ? `calc(100% - ${drawerWidth.current}px)` : "100%" },
                    // ml: { sm: `${drawerWidth.current}px` },

                }}
                style={{ backgroundColor: "#343a40" }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        {navigate.pathname !== "/login-page" && navigate.pathname !== "/sign-up-page" ? <MenuIcon /> : null}
                    </IconButton>
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

                                <Box sx={{ position: 'relative' }} className="appBarIcons">
                                    {/* <Box sx={{ display: { md: 'flex' } }} > */}
                                    <Tooltip idUser={authLogin?.Auth} />

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
                                    {/* </Box> */}


                                </Box> : null



                        }

                        {
                            navigate.pathname !== "/login-page" && navigate.pathname !== "/sign-up-page" ?
                                <div>
                                    <FadeMenuMobile idUser={authLogin?.Auth} />

                                </div> : null
                        }



                        {/* <!-- Bottom tooltip--> */}

                    </Typography>



                    {
                        authLogin && authLogin.Auth !== null ?
                            <Dropdown className="d-inline mx-2">
                                <Dropdown.Toggle id="dropdown-autoclose-true">
                                    <AccountCircle />{user && user[0]?.userName}
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


            <Box
                component="nav"
                sx={{ width: { sm: navigate.pathname !== "/login-page" && navigate.pathname !== "/sign-up-page" ? drawerWidth.current : "0%" }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}

                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth.current },
                    }}
                >




                    {drawer}

                </Drawer>

                <Drawer
                    variant="permanent"
                    className={` ${navigate.pathname === "/login-page" || navigate.pathname === "/sign-up-page" ? "d-none" : ""}`}
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth.current },
                    }}
                    open

                >
                    {drawer}
                </Drawer>


            </Box>
            <Box
                className='w-100'
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: navigate.pathname !== "/login-page" || navigate.pathname === "/sign-up-page" ? `calc(100% - ${drawerWidth.current}px)` : "100%" } }}
            >
                {/* {

                    !mobileOpen ? <Toolbar /> : null
                } */}
                {/* <Toolbar /> */}


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
                    <Route exact path="/not-finish-page" element={<PrivateRouter>
                        <NotFinish_Page />
                    </PrivateRouter>} />
                    <Route exact path="/setting-account-page" element={<PrivateRouter>
                        <Account_Page />
                    </PrivateRouter>} />
                    <Route exact path="/sign-up-page" element={
                        <SignUp />
                    } />
                    <Route exact path="/login-page" element={
                        <SignIn />
                    } />


                </Routes>

            </Box>
        </Box>
    );
}
