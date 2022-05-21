import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { pink } from '@mui/material/colors';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import Work_Api from '../../api/api_work/api_work';
export default function FadeMenu({ idUser }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [work, setData] = useState([])
    const [workFinised, setFinished] = useState()
    const [workNotFinished, setNotFinish] = useState()

    useEffect(() => {
        const getWorkFinished = async (idUser) => {

            await Work_Api?.getWorkByIdUser(idUser)?.then((res) => setData(res?.data?.finishPost))

        }
        getWorkFinished(idUser)

    }, [])

    useEffect(() => {
        const returnArray = () => {

            const a = work?.filter(res => res?.statusFinised === true)
            const b = work?.filter(res => res?.statusFinised !== true)
            setFinished(a)
            setNotFinish(b)

        }
        returnArray()
    }, [work])


    return (
        <div>

            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={'!'} color="error">

                    <NotificationsIcon onClick={handleClick} />


                </Badge>

            </IconButton>

            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}

            >
                <div className='mb-2'>
                    <strong><NotificationsActiveIcon sx={{ color: pink[500] }} /></strong> Bạn có {workNotFinished?.length} công việc chưa hoàn thành.
                </div>
                <div>
                    <strong><CheckCircleIcon color="success" /></strong> Bạn có {workFinised?.length} công việc đã hoàn thành

                </div>

                {/* <div className='mt-2'>
                    <button className='btn btn-danger text-right m-2'><DeleteForeverSharpIcon />Xóa tất cả</button>

                </div> */}
            </Menu>
        </div>
    );
}