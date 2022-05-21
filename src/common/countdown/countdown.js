import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { saveTime } from '../../component/redux/feature/timer';
import Work_Api from '../../api/api_work/api_work';
export const CountDown = ({ hours = 0, minutes = 0, seconds = 0, id, setStart, data, user, status, response }) => {

    const [paused, setPaused] = React.useState(false);
    const [over, setOver] = React.useState(false);
    // const timer = useSelector((state) => state?.timer);
    // const dispatch = useDispatch();


    // console.log(id, 'id');
    const [time, setTime] = React.useState({
        hours: parseInt(hours, 10),
        minutes: parseInt(minutes, 10),
        seconds: parseInt(seconds, 10)
    });

    const converTimeToSecons = (hours, minutes) => {
        //1 giờ 30 phút
        const result = ((3600 * hours) + (60 * minutes)) * 1000
        console.log(result, 5656);
    }

    const getTimeNow = () => {
        const timeNow = new Date().getTime()
        // console.log(timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds(), 'timenow');
        console.log(timeNow, 'time');
    }

    // ((converTimeToSecons(18,0)) + (time.hours * 3600 + time.minutes * 60)) - getTimeNow()

    useEffect(() => {
        converTimeToSecons(8, 51)
        getTimeNow()
    }, [])

    // useEffect(() => {
    //     const handleTimeUp = async (over) => {
    //         if (over) {
    //             await Work_Api?.update_Work(id, { ...dataWork?.finishPost[0], status: false, user: user }).then((res) => console.log(res, 565))

    //             // console.log(over, 'aaa');
    //         }
    //     }
    //     handleTimeUp(over)
    // }, [over])

    // useEffect(() => {
    //     const handleTimeUp = async (timeUp) => {
    //         console.log(timeUp, 5656);
    //         if (timeUp.status) {
    //             timeUp.idPost.forEach(element => {
    //                 // console.log(element, 777);
    //                 Work_Api?.update_Work(element.post, { ...data?.finishPost[0], status: false, user: user }).then((res) => console.log(res, 565))
    //                 Work_Api?.update_Status_Finish_Work(element.post, { ...data?.finishPost[0], user: user, statusFinised: true }).then((res) => console.log(res, 1111))
    //             });
    //             // await Work_Api?.update_Work(timeUp.idPost.post, { ...dataWork?.finishPost[0], status: false, user: authLogin?.Auth }).then((res) => console.log(res, 565))
    //             // await Work_Api?.update_Status_Finish_Work(timeUp.idPost, { ...dataWork?.finishPost[0], user: authLogin?.Auth, statusFinised: true }).then((res) => console.log(res, 1111))
    //             setStart(false)
    //             // console.log(over, 'aaa');
    //         }
    //     }
    //     handleTimeUp(timeUp)
    // }, [timeUp.status])

    const tick = async () => {
        // if (startTime) {
        // do nothing if paused or over

        if (paused || over) return;
        if (response?.endWork) {
            setOver(true);

        }
        // Time up
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
            setOver(true);
            if (id) {
                if (!status) {
                    await Work_Api?.update_Work(id, { ...data[0], status: false, user: user }).then((res) => console.log(res, 565))
                    if (!response?.statusFinised) {
                        await Work_Api?.update_Status_Finish_Work(id, { ...data[0], user: user, statusFinised: true }).then((res) => console.log(res, 1111))
                        await Work_Api?.update_point_by_id(id, { ...data[0], scores: 0, user: user })
                    }

                }
            }


            setStart({ id: id, status: false })


            // Axios
        } else if (time.minutes === 0 && time.seconds === 0) {
            // decrement hour

            setTime({
                hours: time.hours - 1,
                minutes: 59,
                seconds: 59
            });

        } else if (time.seconds === 0) {
            // decrement minute
            setTime({
                hours: time.hours,
                minutes: time.minutes - 1,
                seconds: 59
            });

        } else {
            // decrement seconds
            setTime({
                hours: time.hours,
                minutes: time.minutes,
                seconds: time.seconds - 1
            });
        }
        // }
        // console.log('function tick');
    };

    // Resets to original state
    const reset = () => {
        setTime({
            hours: +hours,
            minutes: +minutes,
            seconds: +seconds
        });
        setPaused(false);
        setOver(false);
    };

    React.useEffect(() => {
        // Works similar to componentDidMount

        let timerID = setInterval(() => tick(), 1000);
        // console.log(timerID, 'đ');
        return () => clearInterval(timerID);

        // Works similar to componentWillUnmount, do clean up in return function of
        // useEffect

        // there is no second argument to useEffect, so it acts as componentDidUpdate
    });

    return (
        <div className="d-flex p-2" style={{ alignItems: "center", justifyContent: "space-between" }}>
            {
                over ? "Đã hết thời gian rồi" :
                    <>
                        <div>
                            {`${time.hours
                                .toString()
                                .padStart(2, "0")}:${time.minutes
                                    .toString()
                                    .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}
                        </div>
                        {/* <div>{over ? "Đã hết thời gian nha!" : ""}</div> */}
                        <button className="btn btn-warning" onClick={() => setPaused(!paused)}>
                            {paused ? "Resume" : "Pause"}
                        </button>
                        <button className="btn btn-info" onClick={() => reset()}>Restart</button>

                    </>

            }

        </div>
    );
};

export default CountDown;
