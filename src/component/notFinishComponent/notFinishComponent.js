import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Work_Api from '../../api/api_work/api_work';

const columns = [
    { id: 'name', label: 'Tên công việc', minWidth: 170 },
    { id: 'date', label: 'Thời gian', minWidth: 150 },
    {
        id: 'statusFinished',
        label: 'Trạng thái hoàn thành',
        minWidth: 200,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'status',
        label: 'Trạng thái hoạt động',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'scores',
        label: 'Điểm số',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'dateWorkToday',
        label: 'Ngày hoạt động',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'notification',
        label: 'Thông báo',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'type_work',
        label: 'Loại công việc',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

function createData(name, date, statusFinished, status, scores, dateWorkToday, notification, type_work) {
    // const density = population / size;
    return { name, date, statusFinished, status, scores, dateWorkToday, notification, type_work };
}

// const rows = [
//     createData('India', 'IN', 1324171354, 3287263),
//     createData('China', 'CN', 1403500365, 9596961),
//     createData('Italy', 'IT', 60483973, 301340),
//     createData('United States', 'US', 327167434, 9833520),
//     createData('Canada', 'CA', 37602103, 9984670),
//     createData('Australia', 'AU', 25475400, 7692024),
//     createData('Germany', 'DE', 83019200, 357578),
//     createData('Ireland', 'IE', 4857000, 70273),
//     createData('Mexico', 'MX', 126577691, 1972550),
//     createData('Japan', 'JP', 126317000, 377973),
//     createData('France', 'FR', 67022000, 640679),
//     createData('United Kingdom', 'GB', 67545757, 242495),
//     createData('Russia', 'RU', 146793744, 17098246),
//     createData('Nigeria', 'NG', 200962417, 923768),
//     createData('Brazil', 'BR', 210147125, 8515767),
// ];

export default function NotFinishWorkComponent() {
    const [page, setPage] = React.useState(0);
    const [data, setData] = React.useState();
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const authLogin = useSelector((state) => state?.auth?.auth);
    const handleRowDateTime = (dateTime) => {

        return `${dateTime?.hours} giờ : ${dateTime?.minutes} phút`

    }

    const rows = data && data?.map((res, idx) => {
        return createData(
            res?.name_work,
            handleRowDateTime(res?.date_work),
            res?.endWork ? <div className='text-success'>Đã hoàn thành</div> : <div className='text-danger'>Chưa hoàn thành</div>,
            res?.status ? "Đã kết thúc" : "Chưa kết thúc",
            res?.scores !== null ? res?.scores : "Chưa có điểm",
            res?.dateWorkToday,
            res?.notification ? "Nhận thông báo" : "Không nhận thông báo",
            res?.type_work,

        )
    }).sort((a, b) => (a.scores < b.scores ? -1 : 1));

    React.useEffect(() => {
        const getAllData = async () => {
            // console.log('vào đây r');
            const today = new Date()
            const convert = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
            await Work_Api.getWorkByIdUser(authLogin?.Auth)?.then((res) =>
                res?.data.finishPost.filter((ele) => ele?.endWork === false)
            ).then((cc) => setData(cc))
        }

        // console.log(dataWork, 'datework');
        getAllData()
    }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className='' >
            <Box sx={{ pt: 5, display: "flex", justifyContent: "space-between" }}>
                <h4>Công việc chưa hoàn thành </h4>

            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }} >

                <TableContainer sx={{ maxHeight: 440 }} >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {

                                rows?.length > 0 ?

                                    rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                                        .map((row) => {

                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        }) : <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell align="center" colSpan={6}> Chưa có dữ liệu</TableCell>
                                    </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
