import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

export default function Landing(props) {
  props.setFooter(false);
  props.setHideNavbar(true);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    let value = e.target.value;
    props.setAddress(value);
  };

  return (
    <div className="landing">
      <div className="info">
        <div className="heading">
          <img src="./logo.svg" height="40"/>
          <h1 className="head">Get served as an emperor</h1>
          <p className="pg">You select we deliver- fast, fresh, and instant food</p>
        </div>
        <div className="form">
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
