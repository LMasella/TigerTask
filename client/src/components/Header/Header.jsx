import React from 'react'
import { Logout, CategoryMenuButton } from '../';
import './header.css';

const Header = ({setCurrentCategory, toggleMenu, setToggleMenu}) => {
  return (
    <div className="header bg-5">
      <CategoryMenuButton toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      <div className="branding doneist">
        <h1><span className="tiger">TIGER</span>Task</h1>
      </div>
      <div className="nav d-flex justify-end">
        <div className="d-flex nav-right">
          <p className="header-welcome">Welcome, <span className="color-4">{localStorage.getItem('name')}</span>!</p>
          <Logout setCurrentCategory={setCurrentCategory} />
        </div>
      </div>
    </div>
  )
}

export default Header