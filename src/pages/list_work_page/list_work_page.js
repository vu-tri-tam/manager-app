import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LineChart_component from '../../component/finishedComponent/lineChart/lineChart';
import BarChart_component from '../../component/finishedComponent/barChart/barChart';
import Item from '../../common/item/item';
import CustomPaginationActionsTable from '../../component/finishedComponent/tableAll/tableAll';
import List_work_component from '../../component/listWorkComponent/list_work_finished';

export default function List_work_Page() {
    return (
        <div style={{ width: '100%', height: "20rem" }} >
            <Box
                sx={{ display: 'flex', bgcolor: 'background.paper', borderRadius: 1, pt: 5 }}
            >
                <Item sx={{ flexGrow: 2 }}  >
                    <List_work_component />

                </Item>


            </Box>

        </div>


    )
}
