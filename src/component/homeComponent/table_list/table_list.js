import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import YouTube from '../../../common/skeleton/skeleton';
import Work_Api from '../../../api/api_work/api_work';
import PlayCircleFilledWhiteSharpIcon from '@mui/icons-material/PlayCircleFilledWhiteSharp';
import PauseCircleSharpIcon from '@mui/icons-material/PauseCircleSharp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import Countdown from '../../../common/countdown/countdown';
// import Loading from 'react-loading';
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
// import { TrainRounded } from '@mui/icons-material';
import CreateNotification from '../../../common/notification/notification';
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from 'react-redux';
import { remove_alll } from '../../redux/feature/todo_work';
import { loginOutForm } from '../../redux/feature/auth';
// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
// import CoundownEvent from '../../../common/countdown/coundownHook';
import CoundownMonent from '../../../common/countdown/coundown-monent';
import LoginApi from '../../../api/login/loginApi';
import CoundownHook from '../../../common/countdown/coundownHook';
// const rows = [
//    console.log(dataWork);
//     // createData('Frozen yoghurt', "15/12/1         999", "Có", "Dễ", "Đang hoạt động"),
//     // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     // createData('Eclair', 262, 16.0, 24, 6.0),
//     // createData('Cupcake', 305, 3.7, 67, 4.3),
//     // createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];


export default function BasicTable() {
    const [dataWork, setData] = React.useState([])
    const [loadingPage, setLoading] = React.useState(false)
    // const [dateToDay, setDate] = React.useState(false)
    const [startTime, setStart] = React.useState({
        id: null,
        status: false
    })
    const [infoUser, setInfoUser] = React.useState()
    const [dateStatus, setStatus] = React.useState(false)
    // const [timeUp, setTimeUp] = React.useState(
    //     {
    //         idPost:,
    //         status: false
    //     }
    // )
    // const productList = useSelector((state) => state?.todo_work);
    const authLogin = useSelector((state) => state?.auth?.auth);
    const dispatch = useDispatch();



    // check reload page
    useEffect(() => {
        window.onbeforeunload = function () {
            return true;
        };

        return () => {
            window.onbeforeunload = null;
        };
    }, []);


    // useEffect(() => {
    //     const handleTimeUp = async (timeUp) => {
    //         console.log(timeUp, 5656);
    //         if (timeUp.status) {
    //             timeUp.idPost.forEach(element => {
    //                 // console.log(element, 777);
    //                 Work_Api?.update_Work(element.post, { ...dataWork?.finishPost[0], status: false, user: authLogin?.Auth }).then((res) => console.log(res, 565))
    //                 Work_Api?.update_Status_Finish_Work(element.post, { ...dataWork?.finishPost[0], user: authLogin?.Auth, statusFinised: true }).then((res) => console.log(res, 1111))
    //             });
    //             // await Work_Api?.update_Work(timeUp.idPost.post, { ...dataWork?.finishPost[0], status: false, user: authLogin?.Auth }).then((res) => console.log(res, 565))
    //             // await Work_Api?.update_Status_Finish_Work(timeUp.idPost, { ...dataWork?.finishPost[0], user: authLogin?.Auth, statusFinised: true }).then((res) => console.log(res, 1111))
    //             setStart(false)
    //             // console.log(over, 'aaa');
    //         }
    //     }
    //     handleTimeUp(timeUp)
    // }, [timeUp.status])

    // localStorage.setItem('startTime', false);
    // console.log(localStorage.getItem('startTime'), 88);
    // React.useEffect(()=>{

    // },)
    // const a = localStorage.setItem('startTime', "false");

    // const handleClientClick = (array, id) => {

    //     let arr
    //     const filterID = array.findIndex((res) => res?.id === id)
    //     if (filterID > -1) {
    //         arr = true


    //     } else {
    //         arr = false
    //     }
    //     return arr
    // }

    const handleStatusWork = (id, status) => {

        const filterData = dataWork?.findIndex((res) => res?._id === id)
        if (filterData > -1) {
            dataWork[filterData].status = status
        }

        return dataWork[filterData].status
        // console.log(dataWork?.post_work[filterData], 88844);

    }


    const handleEndWork = async (id, data, status) => {

        // const dataPost = handleStatusWork(id, true)
        await Work_Api?.update_end_Work(id, { ...dataWork[0], endWork: status, user: authLogin?.Auth })
        await Work_Api?.update_Work(id, { ...dataWork[0], status: false, user: authLogin?.Auth })
        await Work_Api?.update_Status_Finish_Work(id, { ...dataWork[0], statusFinised: true, user: authLogin?.Auth })

        setStart({ id: id, status: true })
        let updateServer
        if (data?.type_work === "easy") {
            updateServer = 5
        }
        else if (data?.type_work === "medium") {
            updateServer = 8
        } else {
            updateServer = 10
        }
        await Work_Api?.update_point_by_id(id, { ...dataWork[0], scores: updateServer, user: authLogin?.Auth })

    }

    const handleClick = async (id, data, status) => {
        const dataPost = handleStatusWork(id, true)
        await Work_Api?.update_Work(id, { ...dataWork[0], status: dataPost, user: authLogin?.Auth })
        if (data === "start") {

            await Work_Api?.update_startAt(id, { ...dataWork[0], startAt: new Date(), user: authLogin?.Auth });
            await Work_Api.getWorkByIdUser(authLogin?.Auth)?.then((res) => setData(res?.data?.finishPost));//nè


        }

        setStart({ id: id, status: true })
        if (status !== true) {
            Swal.fire({
                title: 'Bạn có chắc muốn dừng công việc?',
                showDenyButton: true,
                confirmButtonText: 'Có',
                denyButtonText: `Không, suy nghĩ lại`,
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const dataPost = handleStatusWork(id, false)
                    await Work_Api?.update_Work(id, { ...dataWork[0], status: dataPost, user: authLogin?.Auth })
                    setStart({ id: id, status: false })
                    Swal.fire('Đã dừng công việc', '', 'success')
                } else if (result.isDenied) {
                    CreateNotification.success('Thông báo', 'Công việc vẫn được tiếp tục')
                }
            })
        }
        // switch (status) {
        //     case true:
        //         const dataPost = handleStatusWork(id, true)
        //         await Work_Api?.update_Work(id, { ...dataWork?.finishPost[0], status: dataPost, user: authLogin?.Auth })
        //         setStart(true)
        //         break;
        //     case false:
        //         Swal.fire({
        //             title: 'Bạn có chắc muốn dừng công việc?',
        //             showDenyButton: true,
        //             showCancelButton: true,
        //             confirmButtonText: 'Có',
        //             denyButtonText: `Không, suy nghĩ lại`,
        //         }).then(async (result) => {
        //             /* Read more about isConfirmed, isDenied below */
        //             if (result.isConfirmed) {

        //                 const dataPost = handleStatusWork(id, false)
        //                 await Work_Api?.update_Work(id, { ...dataWork?.finishPost[0], status: dataPost, user: authLogin?.Auth })
        //                 setStart(false)
        //                 Swal.fire('Đã hủy', '', 'success')



        //             } else if (result.isDenied) {
        //                 CreateNotification.success('Thông báo', 'Công việc vẫn được tiếp tục')
        //             }
        //         })
        //         // setStart(status)
        //         break;
        //     default:
        //         const dataPost = handleStatusWork(id, status)
        //         await Work_Api?.update_Work(id, { ...dataWork?.finishPost[0], status: dataPost, user: authLogin?.Auth })
        //         setStart(status)
        //         break;
        // }


    }
    // const handleRemoveAll = () => {
    //     const addWork = remove_alll()

    //     dispatch(addWork)
    // }
    // const handleLogout = () => {
    //     const addWork = loginOutForm()

    //     dispatch(addWork)
    // }


    React.useEffect(() => {
        const getAllData = async () => {
            // console.log('vào đây r');
            const today = new Date()
            const convert = today.getFullYear() + '-' + "0" + (today.getMonth() + 1) + '-' + today.getDate()
            // console.log(today, 'today');
            await Work_Api.getWorkByIdUser(authLogin?.Auth)?.then((res) =>
                res?.data.finishPost.filter((ele) => ele.dateWorkToday === convert)
                // console.log(ele.dateWorkToday, 777)
            ).then((cc) => setData(cc))
        }
        LoginApi?.getUserLogin()?.then((res) => setInfoUser(res?.data?.accessToken))

        getAllData()
        // filterDataByDate()
    }, [])


    // React.useEffect(() => {
    //     const getAllData = async () => {
    //         // console.log('vào đây r');
    //         const today = new Date()
    //         const convert = today.getFullYear() + '-' + "0" + (today.getMonth() + 1) + '-' + today.getDate()
    //         await Work_Api.getWorkByIdUser(authLogin?.Auth)?.then((res) =>
    //             res?.data.finishPost.filter((ele) => ele.dateWorkToday === convert)
    //         ).then((cc) => setData(cc))
    //     }
    //     getAllData()
    //     // console.log('ok nha');
    // }, [startTime])


    React.useEffect(() => {
        setLoading(true)
        // console.log(localStorage.getItem('startTime'), 777);
        // Work_Api?.getAllWork()?.then((res)=>setAllWork(res?.data?.post_work))
        setTimeout(() => {
            setLoading(false)
        }, [2000]);
    }, [])

    return (
        <TableContainer component={Paper}>

            <Table sx={{ minWidth: 900 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell ><WorkOutlineIcon />Tên công việc (trong 1 ngày)</TableCell>
                        <TableCell align="center"><AccessTimeIcon />Thời gian </TableCell>
                        <TableCell align="center"><NotificationsNoneIcon />Thông báo</TableCell>
                        <TableCell align="center"><WorkOutlineIcon />Mức độ</TableCell>
                        <TableCell align="center"><WorkOutlineIcon />Trạng thái </TableCell>
                        <TableCell align="center"><PendingActionsIcon />Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        dataWork?.length <= 0 && loadingPage || authLogin && authLogin.Auth === null ?
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" colSpan={6} >
                                    <YouTube arr={1} />
                                </TableCell>
                            </TableRow>
                            : dataWork?.length <= 0 && loadingPage === false || authLogin && authLogin.Auth === null ?
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" colSpan={5}> Chưa có công việc ngày hôm nay :((</TableCell>
                                </TableRow> :
                                dataWork?.map((row, i) => {

                                    return <TableRow
                                        key={i}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row?.status ? <CircleSharpIcon color='success' fontSize='1rem' className='mx-2' /> : null}{row.name_work}</TableCell>
                                        <TableCell align="center">
                                            {
                                                !row?.statusFinised ?
                                                    row?.status ?
                                                        <CoundownMonent key={i} id={row?._id} status={row?.statusFinised} hours={row?.date_work?.hours} minutes={row?.date_work?.minutes} response={row} data={dataWork} user={authLogin?.Auth} setStart={setStart} infoUser={infoUser} />

                                                        : `${row?.date_work?.hours} giờ ${row?.date_work?.minutes} phút  `

                                                    : 'Đã hết thời gian rồi'

                                            }



                                        </TableCell>
                                        <TableCell align="center">{row.notification ? "Có" : "Không"}</TableCell>
                                        <TableCell align="center">{row.type_work === "easy" ? "Dễ" : row.type_work === "medium" ? "khó" : "Trung bình"}</TableCell>
                                        <TableCell align="center" >{row.endWork ? <div><CheckCircleIcon color="success" />(success)</div> : <div><ErrorIcon color="error" />(fail)</div>}</TableCell>
                                        <TableCell align="center">
                                            <div>{
                                                row?.status ?
                                                    <div className='d-flex w-100'>
                                                        <button className='btn btn-warning'><PauseCircleSharpIcon onClick={() => handleClick(row?._id, "end", false)} /></button>
                                                        <button className='btn btn-danger mx-2'><CheckCircleOutlineIcon onClick={() => handleEndWork(row?._id, row, true)} /></button>
                                                    </div>
                                                    : <button className='btn btn-success' disabled={row?.statusFinised}><PlayCircleFilledWhiteSharpIcon className='mx-2' onClick={() => handleClick(row?._id, "start", true)} />{row?.statusFinised ? "Đã đóng" : "Bắt đầu"}</button>}
                                            </div>

                                        </TableCell>
                                        {/* <TableCell align="center">{row.protein}</TableCell> */}
                                    </TableRow>
                                })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
