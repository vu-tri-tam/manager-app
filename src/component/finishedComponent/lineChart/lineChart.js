import { React, useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import {
    Chart,
    BarSeries,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
// import { EventTracker, HoverState } from '@devexpress/dx-react-chart';
import { Box } from '@mui/material';

// import { ageStructure } from '../../../demo-data/data-vizualization';
import Work_Api from '../../../api/api_work/api_work';

// import { bitcoin as data } from '../../../demo-data/data-vizualization';





export default function LineChart_component({ data }) {


    // const [state, setState] = useState({
    //     data,
    //     hover: undefined,
    // })
    const [dataDate, setData] = useState([])

    // const { data: chartData } = state;


    const handleData = (data) => {
        const newArray = []
        // console.log(data, 'data');
        data && data?.forEach(element => {
            // console.log(element?.dateWorkToday.slice(4, 7))
            if (element.scores > 0) {
                newArray.push({
                    year: element?.name_work,
                    population: element?.scores

                })
            }


        });
        return newArray

    }
    // const changeHover = hover => setState({ hover });
    useEffect(() => {
        // console.log(data, 'datax')
        setData(handleData(data))

    }, [data])

    return (
        <div className='mt-5'>

            <Paper>
                <Box sx={{ p: 2 }}>
                    <h4>Thống kê tất cả </h4>
                </Box>
                {
                    dataDate.length > 0 ?
                        <Chart
                            data={dataDate}
                        >
                            <ArgumentAxis />
                            <ValueAxis />

                            <BarSeries
                                valueField="population"
                                argumentField="year"
                            />
                            {/* <EventTracker /> */}
                            {/* <HoverState hover={hover} onHoverChange={() => changeHover()} /> */}
                        </Chart>
                        : <div className='p-5 text-center'>Chưa có dữ liệu thống kê</div>
                }

            </Paper>


        </div>


    )
}
