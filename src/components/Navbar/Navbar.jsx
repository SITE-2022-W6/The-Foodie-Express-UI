import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar(props) {
  const navigate = useNavigate();
  const navigateTo = (link) => {
    navigate(link)
  }
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src="./logo.svg" width="250" height="" />
        </Link>
      </div>
      <div className="links">
        <button className="btn login-btn" onClick={() => navigate('/login')}>Log In</button>
        <button className="btn signup-btn" onClick={() => navigate('/register')}>Sign Up</button>
      </div>
    </div>
  );
}
