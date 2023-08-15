import React from 'react'
import './welcome.css';

const Welcome = ({setAddCategory}) => {
  return (
    <div className="welcome">
        <p>Welcome to TigerTask! Pick a category or <button className="button-welcome" onClick={() => setAddCategory(true)}>create one</button> to get started!</p>
    </div>
  )
}

export default Welcome