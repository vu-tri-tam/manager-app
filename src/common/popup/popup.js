import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
import Work_Api from '../../api/api_work/api_work';
import Example from '../loading/loading';
import CreateNotification from '../notification/notification';
import { useSelector } from 'react-redux';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};



export default function NestedModal({ open, handleOpen, state }) {
    const [confirm, setConfirm] = React.useState(false);
    const [date, setDate] = React.useState();

    // console.log(state, 'state');
    React.useEffect(() => {
        const today = new Date()
        const convert = today.getFullYear() + '-' + "0" + (today.getMonth() + 1) + '-' + today.getDate()
        setDate(convert);


    }, [])
    const handleConfirm = async () => {
        // console.log(state, 'statexx');
        // if (state.notification === "" && state.type_work === "") {
        //     setState({ ...state, notification: true, type_work: "easy" })
        // }


        setConfirm(true)
        const timer = setTimeout(() => {
            handleOpen(false)
            setConfirm(false)
        }, 1000);

        // handleOpen(false)
        // setConfirm(true)
        try {
            await Work_Api.post_Work({
                name_work: state.name_work,
                date_work:
                {
                    hours: state.date_work?.hours,
                    minutes: state.date_work?.minutes
                }
                ,
                status: false,
                startAt: "",
                timeRemain: null,
                dateWorkToday: date,
                notification: state.notification !== "" ? state.notification : true,
                type_work: state.type_work !== "" ? state.type_work : "easy"

            }).then(res => {
                if (res?.data?.success) {
                    CreateNotification.success("Thông báo", 'Đã Ghi nhận công việc hôm nay', 1500)
                } else {
                    CreateNotification.error("Thông báo", 'Có lỗi xảy ra vui lòng kiểm tra lại', 1500)
                }
            })

        } catch (error) {
            console.log(error.message);
            CreateNotification.error("Thông báo", 'Có lỗi xảy ra vui lòng kiểm tra lại', 2000)
        }
        // setConfirm(true)
    }
    // const handleOpen = () => {
    //     setOpen(true);
    // };
    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <div >



            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <Box sx={{ ...style, width: 600 }} className={`${confirm ? 'container-loading' : null}`}>
                    {
                        confirm ? <Example width={40} height={40} color={"white"} className="css-loading" /> : null
                    }
                    <h2 id="parent-modal-title">{state?.name_work} ?</h2>
                    <p id="parent-modal-description">
                        Thời gian áp dụng: {`${state?.date_work?.hours} giờ ${state?.date_work.minutes} phút`}

                    </p>
                    <p >
                        Nhận thông báo: {state.notification === "true" ? "Nhận thông báo" : "Không nhận thông báo"}
                    </p>
                    <p >
                        Loại công việc: {state.type_work !== "" ? state.type_work : "easy"}
                    </p>
                    <p >
                        Trạng thái: Đang hoạt động
                    </p>
                    <button className='btn btn-danger' onClick={() => handleOpen(false)} disabled={confirm}>Hủy</button>
                    <button className='btn btn-success mx-2' onClick={handleConfirm} disabled={confirm}>Xác nhận</button>
                    {/* <ChildModal /> */}
                </Box>



            </Modal>
        </div>
    );
}
