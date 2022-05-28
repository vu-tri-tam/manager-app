import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import LoginApi from '../../api/login/loginApi';
import user from "../../images/user.png";
import CreateNotification from '../../common/notification/notification';
import CircleSharpIcon from '@mui/icons-material/CircleSharp';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
export default function AccountComponent() {
    const [status, setStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [users, setUser] = useState({})

    const authLogin = useSelector((state) => state?.auth?.auth);

    useEffect(() => {
        LoginApi.getUserLogin()?.then((res) => res?.data?.accessToken.filter((ele) => ele._id === authLogin?.Auth)).then((elementFilter) => setUser(elementFilter))
    }, [])
    useEffect(() => {
        LoginApi.getUserLogin()?.then((res) => res?.data?.accessToken.filter((ele) => ele._id === authLogin?.Auth)).then((elementFilter) => setUser(elementFilter))
    }, [users])

    const handleUpdateUser = (event) => {
        event.preventDefault()
        LoginApi.updateUser(authLogin?.Auth, {
            userName: event.target.userName.value,
            email: event.target.email.value,

        }).then((res) => {
            if (res?.data?.success) {
                setLoading(true)
                setTimeout(() => {
                    setLoading(false)
                    CreateNotification.success('Thành công', 'Sửa thành công')
                    setStatus(false)
                }, 1000)
            }
        })
    }
    return (
        <section className="section pt-4">
            <div className="card shadow-sm mb-3" style={{ overflow: "hidden" }}>
                <div className="row">
                    <div className="col-lg-4 p-5 d-flex flex-column align-items-center justify-content-center" style={{ borderRight: "1px solid #f1f1f1" }}>
                        <img src={user} className="rounded-circle avatar-lg img-thumbnail" alt="profileimage" />
                        <h3 className=""></h3>
                        <div className="mt-2">
                            <p className="text-muted"><strong><CircleSharpIcon color='success' fontSize='1rem' className='mx-2' />Đang hoạt động</strong> </p>
                            <p className="text-muted"><strong>Mã tài khoản: 00301321312</strong> </p>
                        </div>
                    </div>
                    <div className="col-lg-8 p-5">
                        <p className="text-muted"><i className="bi bi-person-fill"></i><strong style={{ fontSize: '1.1rem' }}> Thông tin cá nhân</strong></p>
                        <div className="row">

                            {
                                status ?
                                    <div className="col-lg-5 col-md-5">
                                        <form onSubmit={handleUpdateUser}>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputEmail1" className="form-label">Họ tên</label>
                                                <input type="text" className="form-control" name='userName' id="exampleInputEmail1" defaultValue={users[0]?.userName} aria-describedby="emailHelp" />

                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
                                                <input type="email" className="form-control" name='email' id="exampleInputPassword1" defaultValue={users[0]?.email} />
                                            </div>

                                            <div className='d-flex'>
                                                <button type='submit' className='btn btn-primary'><CheckIcon />Xác nhận</button>
                                                <button className='btn btn-danger mx-2' onClick={() => setStatus(false)}><CancelIcon />Hủy bỏ </button>
                                            </div>
                                        </form> </div> :
                                    <div className="col-lg-6 col-md-6">
                                        <p>Họ tên:<strong> {users[0]?.userName ? users[0]?.userName : "Đang cập nhật..."} </strong> </p>
                                        <p>Email: <strong>{users[0]?.email ? users[0]?.email : "Đang cập nhật..."}</strong> </p>
                                        <p>Ngày tạo:<strong> {users[0]?.date ? new Date(users[0]?.date).toISOString().slice(0, 10) : "Đang cập nhật.."} </strong> </p>
                                        <div className='d-flex'>
                                            <button className='btn btn-primary' onClick={() => setStatus(true)}><EditIcon />Chỉnh sửa</button>
                                            <button className='btn btn-warning mx-2'><DoNotDisturbAltIcon />Vô hiệu hóa </button>
                                        </div>

                                    </div>
                            }

                        </div>
                        {/* <div className="row mt-3">
                            <div className='d-flex'>
                                <button className='btn btn-primary'>Chỉnh sửa</button>
                                <button className='btn btn-warning mx-2'>Vô hiệu hóa </button>
                            </div>

                        </div> */}

                    </div>
                </div>
            </div>
        </section>

    )
}
