import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Login } from '../';
import './home.css';

const Home = () => {
  return localStorage.getItem('uuid') !== null ? 
    <Navigate to='/dashboard' replace />
    : 
    <div className="home-container">
      <div className="home-content bg-5 d-flex flex-column justify-start">
        <div className="d-flex flex-column justify-center align-center">
          <div className="doneist">
          <h1><span>TIGER</span>Task</h1>
          </div>
          <Login />
        </div>
        <div className="blurb">
          <p>TigerTask is a task management app built for members of small teams to create and assign tasks to themselves and one another.</p>
          <div className="demo-info">
            <p>Demo: <br/>Email: demo@user.com<br />Password: demo1234</p>
          </div>
        </div>
      </div>
    </div>
}

export default Home;