import React from 'react'
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import FormPropsTextFields from '../../component/homeComponent/form/formAction';
import BasicTable from '../../component/homeComponent/table_list/table_list';
import { Box } from '@mui/material';

export default function Home_page() {
    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));
    return (
        <div>
            <DrawerHeader />
            <Typography paragraph>
                <FormPropsTextFields />
            </Typography>
            <Typography paragraph>
                <Box sx={{ pb: 2, display: "flex", justifyContent: "space-between" }}>
                    <h4>Công việc trong ngày hôm nay </h4>
                    {/* <Countdown minutes={5} seconds={55} /> */}
                    {/* <Countdown hours={res.hours} minutes={res.minutes} startTime={startTime} /> */}
                    {/* <div>{startTime ? <button className='btn btn-warning'><PauseCircleSharpIcon onClick={() => setStart(false)} />Dừng tính điểm</button> : <button className='btn btn-success'><PlayCircleFilledWhiteSharpIcon className='mx-2' onClick={() => setStart(true)} />Bắt đầu tính điểm</button>}</div> */}
                </Box>
                <BasicTable />
            </Typography>
        </div>
    )
}
