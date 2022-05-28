import React, { useEffect, useState } from 'react'

import Work_Api from '../../api/api_work/api_work'
// import LoginApi from '../../api/login/loginApi'

export default function CoundownMonent({ hours, minutes, id, setStart, data, user, status, response, infoUser }) {

    //khi sử dụng component lại nhiều lần khác nhau muốn react phân biệt dc chỉ cần lưu vô state
    const [dateNew, setDateNew] = useState()
    const [statusDateNew, setStatus] = useState(false)

    const converTimeToSecons = (hours, minutes) => {
        //1 giờ 30 phút
        return ((3600 * 1000 * hours) + (60 * 1000 * minutes))
        // console.log(result, 5656);
    }

    // const convertTimeToSeconds = (hms) => {
    //     const [hours, minutes, seconds] = hms.toString().split(':');
    //     const totalSeconds = (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds);
    //     console.log(totalSeconds, 'hms');
    // }
    const filterInfoUserById = (data) => {
        let emailUser

        data?.filter((res) => {
            if (res?._id === response.user) {
                emailUser = res.email
            }

        })
        return emailUser
    }
    // console.log(filterInfoUserById(infoUser), 'filterInfoUserById');
    useEffect(() => {
        const handleUpSever = async () => {
            if (statusDateNew === true) {
                if (id) {
                    if (!status) {
                        await Work_Api?.update_Work(id, { ...data[0], status: false, user: user })
                        if (!response?.statusFinised) {
                            await Work_Api?.update_Status_Finish_Work(id, { ...data[0], user: user, statusFinised: true })
                            await Work_Api?.update_point_by_id(id, { ...data[0], scores: 0, user: user })
                        }

                    }

                }

                setStart({ id: id, status: false })
            }


        }
        handleUpSever()


    }, [statusDateNew])


    useEffect(() => {
        const time = converTimeToSecons(hours, minutes)
        // console.log(time, 'time');
        // if()
        let interVal = setInterval(async () => {
            const idx = await (new Date(response.startAt).getTime() + time - new Date().getTime());
            const newTime = idx > 0 ? idx : 0;
            if (newTime !== 0 && idx !== NaN) {
                newTime && setDateNew(new Date(newTime).toISOString().substr(11, 8));
            }
            //parse milisecond sang dang ngay YYYY-MM-DDTHH:mm:ss.sssZ sau đó cắt chuỗi lấy dc h:i:s

            const a = ((new Date(response.startAt).getTime() + time - new Date().getTime()) / 1000).toString().slice(0, 2)

            if (a * 1 === 0) {
                console.log(typeof (a), 'aa');
                setStatus(true)
                if (response?.notification === "true") {
                    Work_Api?.post_sendMail({ content: `Công việc ${response?.name_work} đã kết thúc vui lòng ghé thăm website: ${<a href="https://manager-app.tk">Tại đây</a>} để kiểm tra`, subject: "Kết thúc công việc", email: filterInfoUserById(infoUser) })

                }

            }
        }, 1000);
        return () => clearInterval(interVal);

    }, [])

    // console.log(dateNew, 'dateNew');
    return (
        // <Countdown endDate={endData} />
        <div>{dateNew !== undefined && dateNew ? dateNew : ""}</div>

    )
}
