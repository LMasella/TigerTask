import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    return localStorage.getItem('uuid') !== null ? 
        <>
            <Outlet />
        </>
    : 
    <Navigate to='/' replace />
}

export default PrivateRoute;