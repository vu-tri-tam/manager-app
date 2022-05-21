import React from 'react'
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import LineChart_component from '../../component/finishedComponent/lineChart/lineChart';
// import BarChart_component from '../../component/finishedComponent/barChart/barChart';
import Item from '../../common/item/item';
// import CustomPaginationActionsTable from '../../component/finishedComponent/tableAll/tableAll';
// import List_work_component from '../../component/listWorkComponent/list_work_finished';
import WorkFinishComponent from '../../component/workFinishComponent/workFinishComponent';

export default function Work_Finish_Page() {
    return (
        <div style={{ width: '100%', height: "20rem" }}>
            <Box
                sx={{ display: 'flex', bgcolor: 'background.paper', borderRadius: 1 }}
            >
                <Item sx={{ flexGrow: 2, mt: 3, p: 0 }} className="w-100">
                    <WorkFinishComponent />

                </Item>


            </Box>

        </div>


    )
}
