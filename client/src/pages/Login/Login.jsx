import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('uuid') !== null) {
      navigate('/');
    }
  }, []);

  const loginHandler = (e) => {
    e.preventDefault();
    axios.post('/api/users/auth', {email, password}, {withCredentials: true})
        .then(res => {
          localStorage.setItem('uuid', res.data._id);
          localStorage.setItem('name', res.data.name);
          navigate('/dashboard');
        })
        .catch(err => {
          setError('Invalid login.');
          console.log(err);
        });
  }

  return (
    <form onSubmit={loginHandler}>
      <h2 className="text-center">Login:</h2>
      <div className="login-container">
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          {error && <p><span className="error">Invalid login.</span></p>}
        </div>
        <div className="d-flex justify-center">
          <button className="login-button">Login</button>
        </div>
      </div>
    </form>
  );
}

export default Login;