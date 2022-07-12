import * as React from 'react';
import './Navbar.css';

export default function Navbar(props) {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="./logo.svg" width="250" height=""/>
      </div>
      <div className="links">
        <button className="btn login-btn">Login</button>
        <button className="btn signup-btn">Sign Up</button>
      </div>
    </div>
  );
}
