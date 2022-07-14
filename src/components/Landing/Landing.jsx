import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

export default function Landing(props) {
  props.setIsLandingPage(true);
  props.setHideNavbar(false);
  const navigate = useNavigate();
  const findAddress = () => {
    navigate('/login');
  };
  return (
    <div className="landing">
      <h1 className="head">Get served as an emperor</h1>
      <p className="pg">You select we deliver- fast, fresh, and instant food</p>
      <form className="address-form" onSubmit={findAddress}>
        <input
          type="text"
          placeholder="Enter Delivery Address"
          className="input form-input"
        />
        <input type="submit" value="Find Food" className="btn find-food-btn" />
      </form>
    </div>
  );
}
