import * as React from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Ripple } from 'react-spinners-css';
import apiClient from '../../services/apiClient';
import './Login.css';

export default function Login(props) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  props.setFooter(false);
  props.setHideNavbar(true);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const logUserIn = async () => {
    setIsLoading(true);
    const { data, error } = await apiClient.loginUser(loginForm);
    if (error) {
      setError(error);
    }
    if (data?.user) {
      props.setIsAuthenticated(true);
      apiClient.setToken(data.token);
    }
    setLoginForm({ email: '', password: '' })
    setIsLoading(false);
  };

  return (
    <div className="login">
      {props.isAuthenticated && <Navigate to="/dashboard" replace={true} />}
      <div className="header">
        <img src="./icon.svg" width="75" />
        <h1 className="head">Log In</h1>
        {error ? <p className="err-msg">{error}</p> : null}
      </div>
      <div className="form">
        <div className="spacing">
          <label className="label">Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={loginForm.email}
            className="input login-input"
            placeholder="johnsmith@gmail.com"
            onChange={handleChange}
          />
        </div>
        <div className="spacing">
          <label className="label">Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={loginForm.password}
            className="input login-input"
            placeholder="Enter your password"
            onChange={handleChange}
          />
        </div>
        <div className="spacing">
          {!isLoading ? (
            <button className="btn login-btn" onClick={logUserIn}>
              Log In
            </button>
          ) : (
            <button className="btn login-btn loading" onClick={logUserIn}>
              <div style={{ margin: '0' }}>Logging in</div>
              <Ripple color="#ffffff" size={21} />
            </button>
          )}
        </div>
      </div>
      <hr className="line-break" />
      <p className="signup-info">
        Don't have an account? Sign up{' '}
        <Link to="/register" className="text-link">
          here
        </Link>
      </p>
    </div>
  );
}
