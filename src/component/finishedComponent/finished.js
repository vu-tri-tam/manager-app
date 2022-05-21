import { React, useState } from 'react';
import Paper from '@mui/material/Paper';
import {
    Chart,
    BarSeries,
} from '@devexpress/dx-react-chart-material-ui';

const data = [
    { year: '1950', population: 2.525 },
    { year: '1960', population: 3.018 },
    { year: '1970', population: 3.682 },
    { year: '1980', population: 4.440 },
    { year: '1990', population: 5.310 },
    { year: '2000', population: 6.127 },
    { year: '2010', population: 6.930 },
];
export default function Finished_component() {
    const [state, setState] = useState({ data })
    const { data: chartData } = state;
    return (
        <Paper>
            <Chart
                data={chartData}
            >

                <BarSeries
                    valueField="population"
                    argumentField="year"
                />
            </Chart>
        </Paper>

    )
}
