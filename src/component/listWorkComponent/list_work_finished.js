import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AxiosSever from '../../api/api_work/api_work';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import EditListWork from './modalFinished/modalFinish';
import Work_Api from '../../api/api_work/api_work';
import CreateNotification from '../../common/notification/notification';







// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function DataTable() {
    const [data, setDataList] = useState([])
    const [show, setShow] = useState(false)
    const [checkRow, setCheckRow] = useState()
    const [dataEdit, setDataEdit] = useState()


    const authLogin = useSelector((state) => state?.auth?.auth);

    const handleShow = (status, data) => {
        setShow(status)
        setDataEdit(data);


    }

    const handleDelete = (idPost) => {
        try {
            if (idPost) {
                let text = `Bạn có muốn xóa.`;
                if (window.confirm(text) == true) {
                    Work_Api.delete_postWork(idPost).then((res) => {
                        res ? CreateNotification.success('Thông báo', 'Xóa thành công') : CreateNotification.error('Thông báo', 'Xóa thất bại')
                    })
                }

            }
        } catch (error) {
            CreateNotification.error('Thông báo', 'Xóa thất bại')
        }
    }

    const renderDetailsButton = (params) => {
        //

        return (
            <strong>
                <button
                    variant="contained"
                    color="danger"
                    size="small"
                    style={{ marginLeft: 16 }}
                    className="btn btn-primary"
                    onClick={() => handleDelete(params.row._id)}
                >
                    <DeleteForeverIcon /> xóa
                </button>
                <button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{ marginLeft: 16 }}
                    className="btn btn-primary"
                    onClick={() => handleShow(true, params.id)}
                >
                    <EditIcon />  Chỉnh sửa
                </button>
            </strong>
        )
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name_work', headerName: 'Tên công việc', width: 130 },
        { field: 'date_work', headerName: 'Thời gian ', width: 130 },
        {
            field: 'notification',
            headerName: 'Thông báo',
            type: 'string',
            width: 90,
        },
        {
            field: 'type_work',
            headerName: 'Loại công việc',
            type: 'string',
            width: 130,
        },
        {
            field: 'action',
            headerName: 'Hành động khác',
            type: 'string',
            width: 280,
            renderCell: renderDetailsButton,
            disableClickEventBubbling: true,
        },
    ];
    useEffect(() => {
        const getAll = async () => {
            let array = []
            const today = new Date()
            // console.log(array, 'rtr');
            const convert = today.getFullYear() + '-' + "0" + (today.getMonth() + 1) + '-' + today.getDate()
            await AxiosSever.getWorkByIdUser(authLogin?.Auth)?.then(res => {
                // console.log(typeof (convert), 'rtr');

                res?.data?.finishPost?.map((e, idx) => {
                    if (e?.dateWorkToday === convert) {
                        array.push({
                            id: idx,
                            _id: e?._id,
                            name_work: e?.name_work,
                            date_work: `${e?.date_work?.hours} giờ ${e?.date_work?.minutes} phút`,
                            notification: e?.notification,
                            type_work: e?.type_work
                        })
                    } else {
                        return
                    }

                })
            })
            setDataList(array)
            // console.log(array, 'array');
        }
        getAll()
    }, [])

    useEffect(() => {
        const getAll = async () => {
            let array = []
            const today = new Date()
            // console.log(array, 'rtr');
            const convert = today.getFullYear() + '-' + "0" + (today.getMonth() + 1) + '-' + today.getDate()
            await AxiosSever.getWorkByIdUser(authLogin?.Auth)?.then(res => {
                // console.log(typeof (convert), 'rtr');

                res?.data?.finishPost?.map((e, idx) => {
                    // console.log(e?.dateWorkToday === convert, 'rtrfff');
                    if (e?.dateWorkToday === convert) {
                        array.push({
                            id: idx,
                            _id: e?._id,
                            name_work: e?.name_work,
                            date_work: `${e?.date_work?.hours} giờ ${e?.date_work?.minutes} phút`,

                            notification: e?.notification,
                            type_work: e?.type_work

                        })
                    } else {
                        return
                    }

                })
            })
            setDataList(array)
            // console.log(array, 'array');
        }
        getAll()
    }, [authLogin.Auth])

    return (
        <div style={{ height: 400, width: '100%' }}>
            <EditListWork show={show} handleShow={handleShow} data={dataEdit} dataInSever={data} />

            <Box className='mb-4'>
                <h4>Danh sách công việc hôm nay</h4>
            </Box>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                columnBuffer={3}
                rowsPerPageOptions={[5]}
                // checkboxSelection
                onSelectionModelChange={itm => setCheckRow(itm)}
            // getRowId={(row) => console.log(row.internalId, 45)}
            // onChange={(event) => console.log(event.target.value, 'fff')}
            />
        </div>
    );
}




