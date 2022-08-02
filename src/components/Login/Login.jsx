import * as React from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Ripple } from 'react-spinners-css';
import apiClient from '../../services/apiClient';
import './Login.css';

export default function Login(props) {
  {/* The useState for setting the login form, loading and error handling */}
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  {/* Toggle whether to hide the navbar and/or footer */}
  props.setFooter(false);
  props.setHideNavbar(true);

  {/* To update the login form useState */}
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  {/* The handle submit to log the user in */}
  const logUserIn = async () => {
    setIsLoading(true);
    const { data, error } = await apiClient.loginUser(loginForm);
    if (error) {
      setError(error);
    }
    if (data?.user) {
      console.log(data)
      props.setIsAuthenticated(true);
      apiClient.setToken(data.token);
      props.setUserInfo({
        id: data.user.id,
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        email: data.user.email,
        phoneNumber: data.user.phone_number,
      })
    }
    setLoginForm({ email: '', password: '' })
    setIsLoading(false);
  };

  return (
    <div className="login">
      {/* Redirect the user to the dashboard page after logging in */}
      {props.isAuthenticated && <Navigate to="/dashboard" replace={true} />}
      {/* The Login Header */}
      <div className="header">
        <img src="./icon.svg" width="75" />
        <h1 className="head">Log In</h1>
        {error ? <p className="err-msg">{error}</p> : null}
      </div>
      <div className="form">
        {/* The form for user to enter its email and password */}
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
          {/* The button to login with the given email and password */}
          {!isLoading ? (
            <button className="btn login-btn" onClick={logUserIn}>
              Log In
            </button>
          ) : (
            <button className="btn login-btn logging-in" onClick={logUserIn}>
              <div style={{ margin: '0' }}>Logging in</div>
              <Ripple color="#ffffff" size={21} />
            </button>
          )}
        </div>
      </div>
      <hr className="line-break" />
      <p className="signup-info">
        {/* For users who don't have the account will go directly to the register page */}
        Don't have an account? Sign up{' '}
        <Link to="/register" className="text-link">
          here
        </Link>
      </p>
    </div>
  );
}
