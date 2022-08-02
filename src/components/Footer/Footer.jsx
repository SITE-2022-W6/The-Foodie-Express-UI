import React from 'react';
import footerIcon from '../../../public/footerIcon.svg'
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin} from 'react-icons/bs';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="containers">
        <div className="about-us">
          <h1 className="head">About Us</h1>
          {/* The Foodie Express mission */}
          <p className="pg">The Foodies Express is a website to help you find restaurants and dishes for you to enjoy, or share your opinions about dishes you have tasted. Created by Winson Chen, Andy Cordero, and Steven Salto.</p>
        </div>
        <div className="social-media">
          {/* Display the social media */}
          <h1 className="head">Follow Us On</h1>
          <div className="icons">
            <BsFacebook size="30px"/>
            <BsTwitter size="30px"/>
            <BsInstagram size="30px"/>
            <BsLinkedin size="30px"/>
          </div>
        </div>
      </div>
      <div className="copyright">
        {/* Copyright of The Foodie Express */}
        <img src={footerIcon} height="50" style={{marginTop: "1em"}}/>
        <p style={{margin: "0.5em 0"}}>&copy; 2022 The Foodie Express, Inc.</p>
      </div>
    </div>
  )
}