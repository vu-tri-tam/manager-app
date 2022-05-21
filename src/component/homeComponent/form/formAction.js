import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './formAction.css'
import CreateNotification from '../../../common/notification/notification';
import DropdownButton from 'react-bootstrap/DropdownButton'
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
import SaveIcon from '@mui/icons-material/Save';
import NestedModal from '../../../common/popup/popup';
import ModalChoose from './chooseTime/chooseTime';
import { useSelector } from 'react-redux';
import Work_Api from '../../../api/api_work/api_work';



const initialValue = {
    name_work: "",
    date_work: [{
        hours: null,
        minutes: null
    }],
    notification: "",
    type_work: ""
}
export default function FormPropsTextFields() {


    const [state, setState] = React.useState(initialValue)
    const [open, setOpen] = React.useState(false)
    const [openChooseTime, setOpenChooseTime] = React.useState(false)
    const [confirm, setConfirm] = React.useState(false)
    const authLogin = useSelector((state) => state?.auth?.auth);
    const [duplicatePostName, setDuplicate] = React.useState()
    React.useEffect(() => {
        Work_Api?.getWorkByIdUser(authLogin?.Auth)?.then((res) => setDuplicate(res?.data?.finishPost))
    }, [])
    const handleSubmit = (data) => {
        console.log(data, 'data');


        // if (data.notification === "true") {
        //     CreateNotification.success("Thông báo", 'Đã kích hoạt thông báo', 2000)
        //     console.log('ok');
        // }

        setState(data)





    }

    const handleConfirm = () => {
        const checkName = duplicatePostName?.filter((duplicate) => duplicate?.name_work.toUpperCase().trim() === state.name_work.toUpperCase().trim())
        if (state.name_work === "" || state.type_work === "" || state.notification == "" || state.date_work.hours === null && state.date_work.minutes === null) {
            CreateNotification.error("Thông báo", 'Vui lòng nhập đủ thông tin', 2000)
        } else if (checkName?.length > 0) {
            CreateNotification.error("Thông báo", 'Công việc đã có rồi', 2000)

        }
        else {
            handleOpen(true);
        }

    }
    const handleOpen = (status) => {
        setOpen(status)
    }
    const handleOpenChoose = (status) => {
        setOpenChooseTime(status)
    }
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            className='w-100'
        >
            {
                open ? <NestedModal open={open} handleOpen={handleOpen} state={state} setState={setState} /> : null

            }
            {
                openChooseTime ? <ModalChoose open={openChooseTime} handleOpen={handleOpenChoose} handleSubmit={handleSubmit} state={state} setState={setState} /> : null
            }
            <Box sx={{ p: 1 }}>
                <h4>Kế hoạch ngày hôm nay</h4>
            </Box>
            <div className='flex-form'>
                <TextField
                    id="standard-password-input"
                    label="Công việc hôm nay"
                    type="text"
                    className='textField'
                    autoComplete="current-password"
                    variant="standard"
                    color="warning"
                    onChange={(e) => handleSubmit({ ...state, name_work: e?.target?.value })}
                />

                {/* <TextField
                    label="Thời gian kết thúc"
                    variant="standard"
                    color="warning"
                    type="date"
                    focused
                    onChange={(e) => handleSubmit('name_date', e?.target?.value)}
                /> */}
                <Box sx={{ minWidth: 220 }} className='textField'>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Nhận thông báo
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}

                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                            color="warning"
                            onChange={(e) => handleSubmit({ ...state, notification: e?.target?.value })}
                        >
                            <option value={"Chọn thông báo"}>Chọn thông báo</option>
                            <option value={true}>Có</option>
                            <option value={false}>Không</option>

                        </NativeSelect>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 220 }} className='textField'>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Loại công việc
                        </InputLabel>
                        <NativeSelect
                            defaultValue={30}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                            onChange={(e) => handleSubmit({ ...state, type_work: e?.target?.value })}
                        >
                            <option value={"Chọn mức độ"}>Mức độ công việc</option>
                            <option value={"easy"}>Dễ</option>
                            <option value={"medium"}>Trung bình</option>
                            <option value={"hard"}>Khó</option>

                        </NativeSelect>
                    </FormControl>
                </Box>
                <Box sx={{ minWidth: 150 }} className='textField'>


                    <button type="button" className='btn btn-primary' onClick={() => setOpenChooseTime(true)}><AccessTimeSharpIcon />Chọn thời gian</button>

                </Box>

                <Stack direction="row" spacing={2} className="styleReponsive">
                    <Button className="bg-success text-white" onClick={handleConfirm} disabled={!state?.name_work}><SaveIcon />Xác nhận</Button>
                </Stack>
            </div>




        </Box>
    );
}
