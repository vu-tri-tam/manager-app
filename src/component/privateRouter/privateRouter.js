import React from 'react'
import { Navigate } from "react-router-dom";

export default function PrivateRouter({ children }) {

    const isLogin = localStorage.getItem('user')

    return isLogin ? children : <Navigate replace to="/login-page" />

}
