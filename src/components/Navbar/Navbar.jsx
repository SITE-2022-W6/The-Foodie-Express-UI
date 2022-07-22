import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiMap, BiUser } from 'react-icons/bi';
import Modal from '../Modal/Modal';
import apiClient from '../../services/apiClient';
import './Navbar.css';

export default function Navbar(props) {
  {/* The useState for updating the address, dropdown and the modal popup */}
  const [updatedAddress, setUpdatedAddress] = useState('')
  const [dropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  {/* Toggle the dropdown for the profile icon */}
  const toggleDropdown = () => {
    setDropdown(current => !current);
  }

  {/* To update the address useState */}
  const handleChange = (e) => {
    let value = e.target.value;
    setUpdatedAddress(value);
  };

  {/* Handle submit to update the new address useState */}
  const updateAddress = () => {
    props.setAddress(updatedAddress)
    setUpdatedAddress('')
    setIsOpen(false);
  }

  const navigate = useNavigate()
  
  {/* Log out the user and redirect the dashboard if the use is on different page */}
  const logUserOut = () => {
    props.setUserInfo({
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
    });
    apiClient.logoutUser();
    props.setIsAuthenticated(false);
    navigate('/dashboard');
  }

  return (
    <div className="navbar">
      <div className="logo">
        {/* Redirects to the dashboard page */}
        <Link to="/dashboard" className="l">
          <img src="./logo.svg" height="37" />
        </Link>
      </div>
      <div className="links">
        <div className="address-modal">
          {/* A button to update the address via modal popup */}
          <button className="btn address-btn" onClick={() => setIsOpen(true)}>
            <BiMap size={21}/>
            <div style={{ margin: '0' }}>{props.address}</div>
          </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <p className="pg">Enter your new delivery address</p>
            <div className="form">
              <input
                type="text"
                name="address"
                placeholder="1 Main Street, City, State"
                className="input address-input"
                onChange={handleChange}
              />
              <button className="btn update-address-btn" onClick={updateAddress}>Update Address</button>
            </div>
          </Modal>
        </div>
        {/* Toggle the links where the user is logged on or not */}
        {!props.isAuthenticated ? <div className="login-signup">
          <button className="btn login-btn" onClick={() => navigate('/login')}>
            Log In
          </button>
          <button
            className="btn signup-btn"
            onClick={() => navigate('/register')}
          >
            Sign Up
          </button>
        </div> :
        <div className="dropdown">
          {/* Toggles the dropdown menu when the user clicks on the profile icon */}
          <button id="myDropdown" className="dropdown-btn" onClick={toggleDropdown}><BiUser size={21} color="#00000080"/></button>
          {dropdown ? <div className="dropdown-content">
            <button className="link" onClick={() => navigate('/profile')}>Profile</button>
            <button className="link" onClick={logUserOut}>Log Out</button>
          </div> : null}
        </div>}
      </div>
    </div>
  )
}
