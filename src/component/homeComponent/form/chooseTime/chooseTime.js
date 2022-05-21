import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import Work_Api from '../../api/api_work/api_work';
import Example from '../../../../common/loading/loading';
import CreateNotification from '../../../../common/notification/notification';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

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

const hours = [
    {
        value: 0,
        label: 'Chọn giờ',
    },
    {
        value: 0,
        label: '0 giờ',
    },
    {
        value: 1,
        label: '1 giờ',
    },
    {
        value: 2,
        label: '2 giờ',
    },
    {
        value: 3,
        label: '3 giờ',
    },
    {
        value: 4,
        label: '4 giờ',
    },
];

const minutes = [
    {
        value: 0,
        label: 'Chọn phút',
    },
    {
        value: 1,
        label: '1 phút',
    },
    {
        value: 10,
        label: '10 phút',
    },
    {
        value: 20,
        label: '20 phút',
    },
    {
        value: 30,
        label: '30 phút',
    },
    {
        value: 50,
        label: '50 phút',
    },
];

export default function ModalChooseTime({ open, handleOpen, handleSubmit, state, setState }) {
    const [confirm, setConfirm] = React.useState(false);
    // const [data, setDataWork] = React.useState([]);
    const [currency, setCurrency] = React.useState({ hours: null, minutes: null });

    // const handleChange = (event) => {
    //     setCurrency(event.target.value);
    // };
    console.log(state, '888');

    const handleConfirm = async () => {
        // console.log(state, 'statexx');
        if (state?.date_work?.hours === null && state?.date_work?.minutes === null) {
            setState({
                ...state,
                date_work:
                {
                    hours: hours[1].value,
                    minutes: minutes[1].value
                }

            })
        }
        setConfirm(true)
        setTimeout(() => {
            handleOpen(false)
            setConfirm(false)
        }, 1000);
        // handleOpen(false)
        // setConfirm(true)

        // const handleOpen = () => {
        //     setOpen(true);
        // };
        // const handleClose = () => {
        //     setOpen(false);
    };

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
                    <div className='mb-5'>
                        <h2>Chọn thời gian áp dụng</h2>
                    </div>
                    <div className='d-flex flex-column'>
                        <TextField
                            id="standard-select-currency-native"
                            select
                            label="Native select"
                            defaultValue={currency?.hours}
                            onChange={(e) => handleSubmit({ ...state, date_work: { ...state.date_work, hours: e?.target?.value } })}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select your currency"
                            variant="standard"
                            className='pb-4'
                        >

                            {hours.map((option) => (

                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="standard-select-currency-native"
                            select
                            label="Native select"
                            defaultValue={currency.minutes}
                            onChange={(e) => handleSubmit(
                                {
                                    ...state,
                                    date_work:
                                    {
                                        ...state.date_work,
                                        minutes: e?.target?.value
                                    }

                                }
                            )}
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Please select your currency"
                            variant="standard"
                            className='pb-4'
                        >
                            {minutes.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>
                    </div>
                    {/* <div className='d-flex flex-column'>
                        <TextField
                            error
                            id="outlined-error"
                            label="Số giờ"
                            defaultValue={1}
                            className='pb-4'
                        />
                        <TextField
                            error
                            id="outlined-error-helper-text"
                            label="Số phút"
                            defaultValue={59}
                            helperText="Incorrect entry."
                            className='pb-4'
                        />
                    </div> */}
                    <button className='btn btn-danger' onClick={() => handleOpen(false)} disabled={confirm}>Hủy</button>
                    <button className='btn btn-success mx-2' onClick={handleConfirm} disabled={confirm}>Xác nhận</button>
                    {/* <ChildModal /> */}
                </Box>



            </Modal>
        </div >
    );
}
