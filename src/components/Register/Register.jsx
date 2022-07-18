import * as React from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Ripple } from 'react-spinners-css';
import apiClient from '../../services/apiClient';
import './Register.css';

export default function Register(props) {
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [confirmedPwd, setConfirmedPwd] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  props.setFooter(false);
  props.setHideNavbar(true);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === 'confirmedPwd') {
      setConfirmedPwd(value);
    } else {
      setSignupForm({ ...signupForm, [name]: value });
    }
  };

  const signUserUp = async () => {
    if (signupForm.password !== confirmedPwd) {
      setError('Password does not match');
      return
    }
    setIsLoading(true);
    const { data, error } = await apiClient.signupUser(signupForm);
    if (error) {
      setError(error);
    }
    if (data?.user) {
      props.setIsAuthenticated(true);
      apiClient.setToken(data.token);
    }
    setSignupForm({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      role: '',
    });
    setConfirmedPwd('')
    setIsLoading(false);
  };

  return (
    <div className="register">
      {props.isAuthenticated && <Navigate to="/dashboard" replace={true} />}
      <div className="header">
        <img src="./icon.svg" width="75" />
        <h1 className="head">Sign Up</h1>
        {error ? <p className="err-msg">{error}</p> : null}
      </div>
      <div className="form">
        <div className="row">
          <div className="spacing">
            <label className="label">First Name</label>
            <br />
            <input
              type="text"
              name="firstName"
              value={signupForm.firstName}
              className="input signup-input"
              placeholder="John"
              onChange={handleChange}
            />
          </div>
          <div className="spacing">
            <label className="label">Last Name</label>
            <br />
            <input
              type="text"
              name="lastName"
              value={signupForm.lastName}
              className="input signup-input"
              placeholder="Smith"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="spacing">
            <label className="label">Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={signupForm.email}
              className="input signup-input"
              placeholder="johnsmith@gmail.com"
              onChange={handleChange}
            />
          </div>
          <div className="spacing">
            <label className="label">Phone Number</label>
            <br />
            <input
              type="text"
              name="phoneNumber"
              value={signupForm.phoneNumber}
              className="input signup-input"
              placeholder="(123) 456-7890"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="spacing">
            <label className="label">Password</label>
            <br />
            <input
              type="password"
              name="password"
              value={signupForm.password}
              className="input signup-input"
              placeholder="Must have at least 8 characters"
              onChange={handleChange}
            />
          </div>
          <div className="spacing">
            <label className="label">Confirm Password</label>
            <br />
            <input
              type="password"
              name="confirmedPwd"
              value={confirmedPwd}
              className="input signup-input"
              placeholder="Re-enter your password"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="spacing">
          {!isLoading ? (
            <button className="btn signup-btn" onClick={signUserUp}>
              Sign Up
            </button>
          ) : (
            <button className="btn signup-btn loading" disabled>
              <div style={{ margin: '0' }}>Signing Up</div>
              <Ripple color="#ffffff" size={21} />
            </button>
          )}
        </div>
      </div>
      <hr className="line-break" />
      <p className="login-info">
        Already have an account? Log in{' '}
        <Link to="/login" className="text-link">
          here
        </Link>
      </p>
    </div>
  );
}
