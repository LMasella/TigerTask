import React from 'react'
import { Link } from 'react-router-dom'
import { Logout } from '../';
import './header.css';

const Header = ({setCurrentCategory}) => {
  return (
    <div className="header bg-5">
      <div className="branding doneist">
        <h1><span>TIGER</span>Task</h1>
      </div>
      <div className="nav d-flex justify-between">
        <Link className="header-link" to='/dashboard'>Dashboard</Link>
        <div className="d-flex nav-right">
          <p>Welcome, <span className="color-4">{localStorage.getItem('name')}</span>!</p>
          <Logout setCurrentCategory={setCurrentCategory} />
        </div>
      </div>
    </div>
  )
}

export default Header