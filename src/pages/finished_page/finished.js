import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import LineChart_component from '../../component/finishedComponent/lineChart/lineChart';
import BarChart_component from '../../component/finishedComponent/barChart/barChart';
import Item from '../../common/item/item';
import CustomPaginationActionsTable from '../../component/finishedComponent/tableAll/tableAll';
import Work_Api from '../../api/api_work/api_work';
import { useSelector } from 'react-redux';

export default function Finished_Page() {
    const idUserLogin = useSelector((state) => state?.auth?.auth);
    const [state, setState] = useState()
    useEffect(() => {
        Work_Api.getWorkByIdUser(idUserLogin.Auth)?.then((res) => setState(res?.data?.finishPost))
    }, [])

    console.log(state);
    return (
        <div style={{ width: '100%', height: "20rem" }}>
            <Box
                sx={{ display: 'flex', flexDirection: "column", bgcolor: 'background.paper', borderRadius: 1, p: 0 }}
            >
                <Item sx={{ flexGrow: 1.5 }}>
                    <LineChart_component data={state} />

                </Item>
                <Item sx={{ flexGrow: 2 }}>
                    <BarChart_component data={state} />
                </Item>


            </Box>
            <Box sx={{}}>
                <CustomPaginationActionsTable data={state} />


            </Box>
        </div>


    )
}
