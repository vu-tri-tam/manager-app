import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Badge from '@mui/material/Badge';
import Work_Api from '../../api/api_work/api_work';

export default function AccountMenu({ idUser }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    // const [work, setData] = React.useState([])
    const [work, setData] = React.useState([])
    const [workFinised, setFinished] = React.useState()
    const [workNotFinished, setNotFinish] = React.useState()

    React.useEffect(() => {
        const getWorkFinished = async (idUser) => {

            await Work_Api?.getWorkByIdUser(idUser)?.then((res) => setData(res?.data?.finishPost))

        }
        getWorkFinished(idUser)

    }, [])

    React.useEffect(() => {
        const returnArray = () => {

            const a = work?.filter(res => res?.statusFinised === true)
            const b = work?.filter(res => res?.statusFinised !== true)
            setFinished(a)
            setNotFinish(b)

        }
        returnArray()
    }, [work])
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{ minWidth: 100 }} >Liên hệ</Typography>
                <Tooltip title="Thông báo công việc">
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={'!'} color="error">
                            <NotificationsIcon onClick={handleClick} color={'light'} />
                        </Badge>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {/* 
                <Divider /> */}
                <MenuItem>
                    <div className='mb-2'>
                        <strong><NotificationsActiveIcon /></strong> Bạn có {workNotFinished?.length} công việc chưa hoàn thành.
                    </div>
                </MenuItem>
                <MenuItem>
                    <div>
                        <strong><CheckCircleIcon color="success" /></strong> Bạn có {workFinised?.length} công việc đã hoàn thành

                    </div>
                </MenuItem>

            </Menu>
        </React.Fragment>
    );
}
