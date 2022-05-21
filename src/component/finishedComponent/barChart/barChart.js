import { React, useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import {
    Chart,
    PieSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { Box } from '@mui/material';
import Work_Api from '../../../api/api_work/api_work';
import { useSelector } from 'react-redux';
const datas = [
    { country: 'Russia', area: 12 },
    { country: 'Canada', area: 7 },
    { country: 'USA', area: 7 },
    { country: 'China', area: 7 },
    { country: 'Brazil', area: 6 },
    { country: 'Australia', area: 5 },
    { country: 'India', area: 2 },
    { country: 'Others', area: 55 },
];

export default function BarChart_component({ data }) {
    const [state, setState] = useState({ data })

    const [dataDate, setData] = useState([])
    const [dataBarChart, setBarChart] = useState([])

    // const { datas: chartData } = state;
    const authLogin = useSelector((state) => state?.auth?.auth);

    const handleData = (data) => {
        const newArray = []

        data.forEach(element => {

            newArray.push({
                country: element?.name_work,
                area: element?.scores

            })

        });
        return newArray

    }

    const handleFilterBarChart = (data) => {
        const dataFilterBarChart = {
            max: 0,
            min: 0,
            zero: 0
        }
        data?.filter((element) => {
            if (element?.scores >= 9) {
                dataFilterBarChart.max++
            } else if (element?.scores >= 5 && element?.scores < 9) {
                dataFilterBarChart.min++
            } else {
                dataFilterBarChart.zero++
            }
        })
        return dataFilterBarChart
    }
    useEffect(() => {
        const getData = async () => {
            await Work_Api?.getWorkByIdUser(authLogin?.Auth)?.then((res) => {
                setData(handleData(res?.data?.finishPost))
                setBarChart(handleFilterBarChart(res?.data?.finishPost))
            })
            // setData(irr)
        }

        getData()

    }, [data])
    // console.log(dataDate, 'ok');
    return (
        <Paper>
            <Box sx={{ p: 2 }}>
                <h4>Đánh giá: {dataBarChart.max / (dataBarChart.max + dataBarChart.min + dataBarChart.zero) * 100 || 0}% đạt yêu cầu</h4>
            </Box>
            <div className>
                <Box className='p-3'>
                    <div>có {dataBarChart.max || 0} công việc điểm cao</div>
                    <div>có {dataBarChart.min || 0} công việc điểm thấp</div>
                    <div>có {dataBarChart.zero || 0} công việc chưa đạt</div>
                </Box>
                <Box>
                    {
                        dataDate?.length > 0 ?
                            <Chart
                                data={dataDate}
                                height={300}
                            >
                                <PieSeries
                                    valueField="area"
                                    argumentField="country"
                                />
                            </Chart> : <div className='p-5 text-center'>Chưa có dữ liệu thống kê</div>
                    }

                </Box>

            </div>

        </Paper>
    )
}
