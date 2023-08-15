import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './logout.css';

const Logout = ({setCurrentCategory}) => {
    const navigate = useNavigate();
  return (
    <button className="button-plain logout" onClick={() => {
        axios.post('/api/users/logout')
        .then(() => {
            localStorage.clear();
            setCurrentCategory('');
            navigate('/');
        })
    }}>logout</button>
  )
}

export default Logout