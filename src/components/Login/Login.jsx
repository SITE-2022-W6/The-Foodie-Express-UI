import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

export default function Login(props) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  props.setIsLandingPage(false);
  props.setHideNavbar(true);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const logUserIn = () => {
    console.log(`Email: ${loginForm.email}`);
    console.log(`Password: ${loginForm.password}`);
    setLoginForm({ email: '', password: '' });
  };

  return (
    <div className="login">
      <div className="header">
        <img src="./icon.svg" width="75" />
        <h1 className="head">Log In</h1>
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
          <button className="btn login-btn" onClick={logUserIn}>Log In</button>
        </div>
      </div>
      <hr className="line-break"/>
      <p className="signup-info">
        Don't have an account? Sign up{' '}
        <Link
          to="/register"
          className="text-link"
        >
          here
        </Link>
      </p>
    </div>
  );
}
