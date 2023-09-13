import React from 'react'
import './categorymenubutton.css';

const CategoryMenuButton = ({toggleMenu, setToggleMenu}) => {
  return (
    <span className="material-symbols-outlined"
        onClick={() => {
            setToggleMenu(!toggleMenu);
        }}
    >
        {toggleMenu ? 'close' : 'menu'}
    </span>
  )
}

export default CategoryMenuButton