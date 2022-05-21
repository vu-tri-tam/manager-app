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
    sentMailConfirm: (data) => {
        return axiosConfig.post(`/api/send-email`, data)
    }
}

export default LoginApi