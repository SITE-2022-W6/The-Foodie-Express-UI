import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import LocationSearchBar from '../LocationSearchBar/LocationSearchBar';
import './Landing.css';

export default function Landing(props) {
  {
    /* Toggle whether to hide the navbar and/or footer */
  }
  props.setFooter(false);
  props.setHideNavbar(true);

  const navigate = useNavigate();

  const handleOnClick = () => {
    //Extracting state and city from address
    const state = props.address.substring(
      props.address.length - 7,
      props.address.length - 5
    );
    const short_address = props.address.substring(0, props.address.length - 9);
    if (short_address.lastIndexOf(', ') == -1) {
      props.setCityState({ city: short_address, state });
    } else {
      const city = short_address.substring(short_address.lastIndexOf(', ') + 2);
      props.setCityState({ city, state });
    }
    window.localStorage.setItem('location', JSON.stringify(props.cityState))
    navigate('/dashboard');
  };

  return (
    <div className="landing">
      <div className="info">
        <div className="heading">
          {/* Header of the Landing Page */}
          <img src="./logo.svg" height="40" />
          <h1 className="head">Life’s too short for boring food</h1>
          <p className="pg">We’ve got something for everyone.</p>
        </div>
        <div className="form">
          <LocationSearchBar
            setAddress={props.setAddress}
            cityState={props.cityState}
            setCityState={props.setCityState}
          />
          <button className="btn find-food-btn" onClick={handleOnClick}>
            Find Food
          </button>
          <p className="credit">Autocomplete powered by Google Maps API</p>
        </div>
      </div>
    </div>
  );
}
