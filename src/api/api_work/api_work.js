import axiosConfig from "../axiosConfig"

const Work_Api = {
    getAllWork: () => {
        return axiosConfig.get(`/api/post-work`)
    },
    getWorkByIdUser: (id) => {
        return axiosConfig.get(`/api/post-work/${id}`)
    },
    post_Work: (data) => {
        return axiosConfig.post('/api/post-work', data)
    },
    update_postWork: (idPost, data) => {
        return axiosConfig.patch(`/api/post-work/post/${idPost}`, data)
    },
    delete_postWork: (idPost) => {
        return axiosConfig.delete(`/api/post-work/${idPost}`)
    },
    post_sendMail: (data) => {
        return axiosConfig.post('/api/send-email', data)
    },
    update_Work: (id, data) => {
        return axiosConfig.patch(`/api/post-work/${id}`, data)
    },
    update_Status_Finish_Work: (idPost, data) => {
        return axiosConfig.patch(`/api/post-work/statusFinised/${idPost}`, data)
    },
    update_end_Work: (idPost, data) => {
        return axiosConfig.patch(`/api/post-work/endWork/${idPost}`, data)
    },
    update_point_by_id: (idPost, data) => {
        return axiosConfig.patch(`/api/post-work/point/${idPost}`, data)
    },
    update_counttime: (idPost, data) => {
        return axiosConfig.patch(`/api/post-work/countime/${idPost}`, data)
    },
    update_startAt: (idPost, data) => {
        return axiosConfig.patch(`/api/post-work/startAt/${idPost}`, data)
    },
}

export default Work_Api