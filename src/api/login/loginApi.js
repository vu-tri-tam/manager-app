import axiosConfig from "../axiosConfig"

const LoginApi = {
    getUserLogin: () => {
        return axiosConfig.get('/api/auth')
    },
    registerUser: (data) => {
        return axiosConfig.post('/api/auth/register', data)
    },
    loginUser: (data) => {
        return axiosConfig.post(`/api/auth/login`, data)
    },
    updateUser: (idUser, data) => {
        return axiosConfig.patch(`/api/auth/update-user/${idUser}`, data)
    },
    sentMailConfirm: (data) => {
        return axiosConfig.post(`/api/send-email`, data)
    }
}

export default LoginApi