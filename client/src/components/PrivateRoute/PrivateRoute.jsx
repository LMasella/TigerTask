import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '../';

const PrivateRoute = ({setCurrentCategory}) => {
    return localStorage.getItem('uuid') !== null ? 
        <>
            <Header setCurrentCategory={setCurrentCategory} />
            <Outlet />
        </>
    : 
    <Navigate to='/' replace />
}

export default PrivateRoute;