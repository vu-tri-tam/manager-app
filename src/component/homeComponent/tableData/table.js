import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import AxiosSever from '../../../api/api_work/api_work';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name_work', headerName: 'Tên công việc', width: 130 },
    { field: 'Time', headerName: 'Thời gian', width: 130 },
    {
        field: 'Thông báo',
        headerName: 'Thông báo',
        type: 'number',
        width: 90,
    },
    {
        field: 'Loại công việc',
        headerName: 'Loại công việc',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.name_work || ''} ${params.row.Time || ''}`,
    },
];

const rows = [
    { id: 1, Time: 'Snow', name_work: 'Jon', age: 35 },
    { id: 2, Time: 'Lannister', name_work: 'Cersei', age: 42 },
    { id: 3, Time: 'Lannister', name_work: 'Jaime', age: 45 },
    { id: 4, Time: 'Stark', name_work: 'Arya', age: 16 },
    { id: 5, Time: 'Targaryen', name_work: 'Daenerys', age: null },
    { id: 6, Time: 'Melisandre', name_work: null, age: 150 },
    { id: 7, Time: 'Clifford', name_work: 'Ferrara', age: 44 },
    { id: 8, Time: 'Frances', name_work: 'Rossini', age: 36 },
    { id: 9, Time: 'Roxie', name_work: 'Harvey', age: 65 },
];

export default function DataTable() {
    const [data, setDataList] = useState()

    useEffect(() => {
        const getAll = async () => {
            await AxiosSever.getAllWork()?.then(res => console.log(res?.data))
        }
        getAll()
    }, [])

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );
}
