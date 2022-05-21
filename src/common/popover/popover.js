import React, { useEffect, useRef, useState } from 'react'
import { Overlay, Popover } from 'react-bootstrap'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { pink } from '@mui/material/colors';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import Work_Api from '../../api/api_work/api_work';
export default function Popover_modal({ show, target, idUser }) {

    const [work, setData] = useState([])
    const [workFinised, setFinished] = useState()
    const [workNotFinished, setNotFinish] = useState()

    useEffect(() => {
        const getWorkFinished = async (idUser) => {

            await Work_Api?.getWorkByIdUser(idUser)?.then((res) => setData(res?.data?.finishPost))

        }
        getWorkFinished(idUser)

    }, [])

    useEffect(() => {
        const returnArray = () => {

            const a = work?.filter(res => res?.statusFinised === true)
            const b = work?.filter(res => res?.statusFinised !== true)
            setFinished(a)
            setNotFinish(b)

        }
        returnArray()
    }, [work])


    const ref = useRef(null);

    return (
        <div ref={ref} className="popover-child">

            <Overlay
                show={show}
                target={target}
                placement="bottom"
                container={ref}
                containerPadding={150}
            >
                <Popover id="popover-contained">
                    {/* <Popover.Header as="h3">Popover bottom</Popover.Header> */}
                    <Popover.Body>
                        <div className='mb-2'>
                            <strong><NotificationsActiveIcon sx={{ color: pink[500] }} /></strong> Bạn có {workNotFinished?.length} công việc chưa hoàn thành.
                        </div>
                        <div>
                            <strong><CheckCircleIcon color="success" /></strong> Bạn có {workFinised?.length} công việc đã hoàn thành

                        </div>
                    </Popover.Body>

                    {/* <button className='btn btn-danger text-right m-2'><DeleteForeverSharpIcon />Xóa tất cả</button> */}

                </Popover>
            </Overlay>
        </div>
    )
}
