import * as React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiMap, BiUser } from 'react-icons/bi';
import Modal from '../Modal/Modal';
import apiClient from '../../services/apiClient';
import './Navbar.css';
import LocationSearchBar from '../LocationSearchBar/LocationSearchBar';

export default function Navbar(props) {
  const [updatedAddress, setUpdatedAddress] = useState('')
  const [dropdown, setDropdown] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setDropdown(current => !current);
  }


  const updateAddress = () => {
    //Extracting state and city from address
    const state = props.address.substring(props.address.length - 7, props.address.length - 5)
    const short_address = props.address.substring(0, props.address.length - 9)
    if (short_address.lastIndexOf(", ") == -1) {
        props.setCityState({ city: short_address, state })
    }
    else {
        const city = short_address.substring(short_address.lastIndexOf(", ") + 2)
        props.setCityState({ city, state })
    }
    setIsOpen(false);
  }

  const navigate = useNavigate()
  
  const logUserOut = () => {
    apiClient.logoutUser();
    props.setIsAuthenticated(false);
  }

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/dashboard" className="l">
          <img src="./logo.svg" height="37" />
        </Link>
      </div>
      <div className="links">
        <div className="address-modal">
          <button className="btn address-btn" onClick={() => setIsOpen(true)}>
            <BiMap size={21}/>
            <div style={{ margin: '0' }}>{props.address}</div>
          </button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <p className="pg">Enter your new delivery address</p>
            <div className="form">
              <div className="searchBar">
                <LocationSearchBar setAddress={props.setAddress} cityState ={props.cityState} setCityState={props.setCityState}/>
              </div>
              <button className="btn update-address-btn" onClick={updateAddress}>Update Address</button>
            </div>
          </Modal>
        </div>
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
          <button id="myDropdown" className="dropdown-btn" onClick={toggleDropdown}><BiUser size={21} color="#00000080"/></button>
          {dropdown ? <div className="dropdown-content">
            <button className="link" onClick={logUserOut}>Profile</button>
            <button className="link" onClick={logUserOut}>Log Out</button>
          </div> : null}
        </div>}
      </div>
    </div>
  )
}
