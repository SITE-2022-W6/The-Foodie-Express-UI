import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

export default function Register(props) {
  const [confirmedPwd, setConfirmedPwd] = useState('');
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
  });

  props.setIsLandingPage(false);
  props.setHideNavbar(true);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === 'confirmedPwd') {
      setConfirmedPwd(value)
    } else {
      setSignupForm({ ...signupForm, [name]: value });
    }
  };

  const signUserUp = () => {
    console.log(`First Name: ${signupForm.firstName}`);
    console.log(`Last Name: ${signupForm.lastName}`);
    console.log(`Email: ${signupForm.email}`);
    console.log(`Phone Number: ${signupForm.phoneNumber}`);
    console.log(`Password: ${signupForm.password}`);
    setSignupForm({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      role: '',
    });
  };

  return (
    <div className="register">
      <div className="header">
        <img src="./icon.svg" width="75" />
        <h1 className="head">Sign Up</h1>
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
        {/*<div className="spacing">
          <label className="label">Select Role</label>
          <br />
          <select className="select role-sel" name="roles">
            <option disabled selected value> -- select an option -- </option>
            <option value="customer">Customer</option>
            <option value="deliver">Deliver</option>
          </select>
        </div> */}
        <div className="spacing">
          <button className="btn signup-btn" onClick={signUserUp}>Sign Up</button>
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
