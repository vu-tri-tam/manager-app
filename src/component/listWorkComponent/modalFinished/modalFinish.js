import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import TextField from '@mui/material/TextField';
import { Form, Button } from 'react-bootstrap'
import Work_Api from '../../../api/api_work/api_work';
import CreateNotification from '../../../common/notification/notification';
import ModalChooseTimeFinish from '../modalChooseTimeFinish/chooseTimeFinish';
import AccessTimeSharpIcon from '@mui/icons-material/AccessTimeSharp';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};



export default function NestedModal({ show, handleShow, data, dataInSever }) {
    const [filterById, setFilter] = useState()
    const [openChooseTime, setOpenChooseTime] = useState()
    const [chooseTimeEdit, setOpenTimeEdit] = useState()
    const [dataEdit, setEdit] = useState({})

    const handleDate = (dataFilter) => {
        return dataFilter && Array.from(dataFilter)?.map(res => {

            return {
                _id: res?._id,
                name_work: res?.name_work,
                date_work: {
                    hours: Number(res?.date_work?.slice(0, 1)),
                    minutes: Number(res?.date_work?.slice(6, 7))
                },
                notification: res?.notification,
                type_work: res?.type_work
            }
        })

    }
    useEffect(() => {
        const filterData = dataInSever?.filter((res) => res?.id === data)
        setFilter(filterData)
        setOpenTimeEdit()
    }, [show])

    // useEffect(() => {
    //     const filterData = dataInSever?.filter((res) => res?.id === data)//
    //     setFilter(filterData)
    // }, [filterById])



    const handleValue = (field, data) => {
        setEdit({
            ...dataEdit,
            [field]: data
        })
    }

    // const handleSubmit = (data) => {
    //     console.log(data, 'data');
    //     setOpenTimeEdit(data)
    // }
    const handleConfirm = (data, chooseTimeEdit, filterById) => {
        // console.log('vào chưa', data);
        // console.log('vào chưa 2', filterById.date_work);
        // console.log('vào chưa 3', chooseTimeEdit);
        const dataEditor = {
            _id: data?._id ? data?._id : filterById?._id,
            name_work: data?.name_work ? data?.name_work : filterById?.name_work,
            date_work: {
                hours: chooseTimeEdit?.hours ? Number(chooseTimeEdit?.hours) : filterById?.date_work?.hours,
                minutes: chooseTimeEdit?.minutes ? Number(chooseTimeEdit?.minutes) : filterById?.date_work?.minutes,
            },
            notification: data?.notification ? data?.notification : filterById?.notification,
            type_work: data?.type_work ? data?.type_work : filterById?.type_work
        }

        try {
            Work_Api.update_postWork(filterById?._id, dataEditor).then((res) => {
                if (res) {
                    CreateNotification.success('Thành công', 'Đã được cập nhật')
                }
            })
        } catch (error) {
            CreateNotification.error('Thất bại', 'Đã xảy ra lỗi vui lòng thử lại')
        }

    }


    // useEffect(() => {
    //     const filterData = dataInSever?.filter((res) => res?.id === data)
    //     setFilter({ ...filterData, date_work: chooseTimeEdit })
    // }, [chooseTimeEdit])

    // console.log(openChooseTime, 'tus')
    // useEffect(() => {
    //     if (openChooseTime !== true) {
    //         handleShow(true)
    //     } else if (openChooseTime !== false) {
    //         handleShow(false)
    //     }
    // }, [openChooseTime])
    const handleOpenChoose = (status) => {
        setOpenChooseTime(status)

    }
    // console.log(handleDate(filterById), 88787878);
    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}

            {
                openChooseTime ? <ModalChooseTimeFinish open={openChooseTime} handleOpen={handleOpenChoose} state={dataEdit} setState={setEdit} setOpenTimeEdit={setOpenTimeEdit} /> : null
            }


            <Modal
                open={show}
                onClose={handleShow}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 600 }} className="border-0 rounded">

                    <Box
                        sx={{

                            '& > :not(style)': { m: 1 }
                        }}

                    >
                        <h3>Edit work</h3>
                        {
                            handleDate(filterById)?.map((res) => {

                                return <Form className='mt-3'>

                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Tên công việc</Form.Label>
                                        <Form.Control type="text" defaultValue={res?.name_work} placeholder="Enter email" onChange={(e) => handleValue('name_work', e?.target?.value)} />
                                        {/* <Form.Text className="text-muted">
        We'll never share your email with anyone else.
    </Form.Text> */}
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Thời gian</Form.Label>
                                        <div className='d-flex'>
                                            <Form.Control type="text" placeholder="Password" value={chooseTimeEdit?.hours !== undefined && chooseTimeEdit?.minutes !== undefined ? `${chooseTimeEdit?.hours} giờ ${chooseTimeEdit?.minutes} phút` : `${res?.date_work?.hours} giờ ${res?.date_work?.minutes} phút`} />
                                            <button type="button" className='btn btn-primary' onClick={() => setOpenChooseTime(true)}><AccessTimeSharpIcon /></button>
                                        </div>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Thông báo</Form.Label>
                                        {/* <Form.Control type="text" placeholder="Password" defaultValue= /> */}
                                        <Form.Select aria-label="Default select example" defaultValue={res?.notification ? 'Có' : 'Không'} onChange={(e) => handleValue('notification', e?.target?.value)}>

                                            <option value={true}>Có</option>
                                            <option value={false}>Không</option>

                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Loại công việc</Form.Label>
                                        {/* <Form.Control type="text" placeholder="Password" defaultValue={res?.type_work} /> */}
                                        <Form.Select aria-label="Default select example" defaultValue={res?.type_work === "easy" ? 'Dễ' : res?.type_work === "medium" ? 'Trung bình' : 'Khó'} onChange={(e) => handleValue('type_work', e?.target?.value)}>

                                            <option value={"easy"}>Dễ</option>
                                            <option value={"medium"}>Trung bình</option>
                                            <option value={"hard"}>Khó</option>

                                        </Form.Select>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" onClick={() => handleShow(false)}>Hủy</Button>
                                    <Button variant="success" type="button" className='mx-2' onClick={() => handleConfirm(dataEdit, chooseTimeEdit, res)}>Xác nhận</Button>
                                </Form>
                            })
                        }


                    </Box>


                </Box>
            </Modal>



        </div>
    );
}
