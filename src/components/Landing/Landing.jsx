import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

export default function Landing(props) {
  {/* Toggle whether to hide the navbar and/or footer */}
  props.setFooter(false);
  props.setHideNavbar(true);
  
  const navigate = useNavigate();

  {/* To update the address useState */}
  const handleChange = (e) => {
    let value = e.target.value;
    props.setAddress(value);
  };

  return (
    <div className="landing">
      <div className="info">
        <div className="heading">
          {/* Header of the Landing Page */}
          <img src="./logo.svg" height="40"/>
          <h1 className="head">Life’s too short for boring food</h1>
          <p className="pg">We’ve got something for everyone.</p>
        </div>
        <div className="form">
          {/* Form for user to enter its delivery address and goes to the 
            dashboard to find the nearby restaurant */}
          <input
            type="text"
            name="address"
            placeholder="Enter Delivery Address"
            className="input address-input"
            onChange={handleChange}
          />
          <button className="btn find-food-btn" onClick={() => navigate('/dashboard')}>Find Food</button>
        </div>
      </div>
    </div>
  );
}
